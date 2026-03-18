const DEFAULT_LENCO_SCRIPT_URL = "https://pay.lenco.co/js/v1/inline.js";
let lencoScriptPromise = null;

function resolveLencoScriptUrl() {
  if (typeof window !== "undefined") {
    const runtimeUrl = String(window.__LENCO_SCRIPT_URL__ || "").trim();

    if (
      runtimeUrl &&
      !runtimeUrl.startsWith("%REACT_APP_LENCO_SCRIPT_URL%")
    ) {
      return runtimeUrl;
    }
  }

  return process.env.REACT_APP_LENCO_SCRIPT_URL || DEFAULT_LENCO_SCRIPT_URL;
}

export function getConfiguredLencoPublicKey(fallback = "") {
  return fallback || process.env.REACT_APP_LENCO_PUBLIC_KEY || "";
}

export function loadLencoScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Lenco can only load in the browser."));
  }

  if (window.LencoPay?.getPaid) {
    return Promise.resolve(window.LencoPay);
  }

  if (lencoScriptPromise) {
    return lencoScriptPromise;
  }

  lencoScriptPromise = new Promise((resolve, reject) => {
    const scriptUrl = resolveLencoScriptUrl();
    const existingScript = document.querySelector(
      `script[data-lenco-script="true"][src="${scriptUrl}"]`,
    );

    const handleReady = () => {
      if (window.LencoPay?.getPaid) {
        resolve(window.LencoPay);
      } else {
        reject(new Error("LencoPay did not initialize correctly."));
      }
    };

    if (existingScript) {
      existingScript.addEventListener("load", handleReady, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load LencoPay.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.dataset.lencoScript = "true";
    script.onload = handleReady;
    script.onerror = () => reject(new Error("Unable to load LencoPay."));
    document.head.appendChild(script);
  });

  return lencoScriptPromise;
}

export async function openLencoPaymentWidget({
  publicKey,
  reference,
  email,
  amount,
  currency,
  channels,
  redirectUrl,
  onSuccess,
  onClose,
  onConfirmationPending,
}) {
  const lenco = await loadLencoScript();
  const merchantKey = getConfiguredLencoPublicKey(publicKey);

  if (!merchantKey) {
    throw new Error("Lenco public key is not configured.");
  }

  lenco.getPaid({
    key: merchantKey,
    reference,
    email,
    amount,
    currency,
    channels,
    redirectUrl,
    onSuccess,
    onClose,
    onConfirmationPending,
  });
}
