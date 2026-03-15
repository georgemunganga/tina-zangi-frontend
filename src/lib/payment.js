const PAYMENT_METHOD_CONFIG = {
  "mobile-money": {
    value: "mobile-money",
    label: "Mobile Money",
    kind: "mobile-money",
    description: "Pay online in Zambian Kwacha with a phone-linked mobile money account.",
  },
  "atm-card": {
    value: "atm-card",
    label: "ATM Card",
    kind: "card",
    description: "Pay in Zambian Kwacha using an ATM or debit card.",
  },
  visa: {
    value: "visa",
    label: "Visa",
    kind: "card",
    description: "Pay online in USD using a Visa card.",
  },
  mastercard: {
    value: "mastercard",
    label: "Mastercard",
    kind: "card",
    description: "Pay online in USD using a Mastercard.",
  },
};

const MOBILE_PROVIDER_LABELS = {
  "mtn-momo": "MTN MoMo",
  mpesa: "M-Pesa",
  "airtel-money": "Airtel Money",
  other: "Other Mobile Money",
};

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function getPaymentMethodConfig(method) {
  return PAYMENT_METHOD_CONFIG[method];
}

export function getPaymentOptionsByCountry(countryCode) {
  const methodValues =
    countryCode === "ZM"
      ? ["mobile-money", "atm-card"]
      : ["visa", "mastercard"];

  return methodValues.map((value) => PAYMENT_METHOD_CONFIG[value]);
}

export function getPaymentMethodLabel(value) {
  return PAYMENT_METHOD_CONFIG[value]?.label || "Payment";
}

export function isCardPaymentMethod(value) {
  return PAYMENT_METHOD_CONFIG[value]?.kind === "card";
}

export function formatCardNumber(value) {
  return digitsOnly(value)
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim();
}

export function formatExpiry(value) {
  const digits = digitsOnly(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function maskPhoneNumber(value) {
  const digits = digitsOnly(value);

  if (!digits) {
    return "";
  }

  if (digits.length <= 4) {
    return `**** ${digits}`;
  }

  return `${digits.slice(0, 3)} **** ${digits.slice(-4)}`;
}

export function maskCardNumber(value) {
  const digits = digitsOnly(value);

  if (!digits) {
    return "";
  }

  return `**** **** **** ${digits.slice(-4)}`;
}

function createPaymentReference(method) {
  const prefix = method === "mobile-money" ? "MM" : "CARD";
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function validatePaymentDetails(paymentMethod, paymentState) {
  const paymentLabel = getPaymentMethodLabel(paymentMethod);

  if (!isCardPaymentMethod(paymentMethod)) {
    if (!paymentState.mobileProvider) {
      return "Select a mobile money provider.";
    }

    if (!paymentState.mobileAccountName.trim()) {
      return "Enter the mobile money account name.";
    }

    if (digitsOnly(paymentState.mobileNumber).length < 8) {
      return "Enter a valid mobile money number.";
    }

    return null;
  }

  if (!paymentState.cardholderName.trim()) {
    return `Enter the ${paymentLabel} card holder name.`;
  }

  const cardDigits = digitsOnly(paymentState.cardNumber);

  if (cardDigits.length < 12) {
    return `Enter a valid ${paymentLabel} card number.`;
  }

  const expiryDigits = digitsOnly(paymentState.expiry);

  if (expiryDigits.length !== 4) {
    return "Enter a valid expiry date in MM/YY format.";
  }

  const expiryMonth = Number(expiryDigits.slice(0, 2));

  if (expiryMonth < 1 || expiryMonth > 12) {
    return "Enter a valid expiry month.";
  }

  const cvvDigits = digitsOnly(paymentState.cvv);

  if (cvvDigits.length < 3 || cvvDigits.length > 4) {
    return "Enter a valid security code.";
  }

  return null;
}

export function buildPaymentRecord(paymentMethod, paymentState, options = {}) {
  const paymentLabel = getPaymentMethodLabel(paymentMethod);

  if (!isCardPaymentMethod(paymentMethod)) {
    return {
      method: paymentMethod,
      methodLabel: paymentLabel,
      provider: MOBILE_PROVIDER_LABELS[paymentState.mobileProvider],
      accountName: paymentState.mobileAccountName.trim(),
      maskedAccount: maskPhoneNumber(paymentState.mobileNumber),
      reference: createPaymentReference(paymentMethod),
      currencyCode: options.currencyCode || "ZMW",
      status: "Paid",
    };
  }

  return {
    method: paymentMethod,
    methodLabel: paymentLabel,
    accountName: paymentState.cardholderName.trim(),
    maskedAccount: maskCardNumber(paymentState.cardNumber),
    expiry: paymentState.expiry,
    reference: createPaymentReference(paymentMethod),
    currencyCode: options.currencyCode || "USD",
    status: "Paid",
  };
}

export function getMobileProviderOptions() {
  return Object.entries(MOBILE_PROVIDER_LABELS).map(([value, label]) => ({
    value,
    label,
  }));
}
