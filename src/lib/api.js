const DEFAULT_LOCAL_API_BASE_URL =
  typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)
    ? "http://localhost:8000"
    : "";

const DEFAULT_DEPLOYED_API_BASE_URL = "https://app.zangisworld.com";

const API_BASE_URL = String(
  process.env.REACT_APP_LARAVEL_API_BASE_URL ||
    process.env.REACT_APP_API_BASE_URL ||
    DEFAULT_LOCAL_API_BASE_URL ||
    DEFAULT_DEPLOYED_API_BASE_URL,
)
  .trim()
  .replace(/\/$/, "");

const INTENT_ENDPOINT =
  process.env.REACT_APP_LENCO_INTENT_ENDPOINT || "/api/v1/payments/lenco/intent";
const VERIFY_ENDPOINT =
  process.env.REACT_APP_LENCO_VERIFY_ENDPOINT || "/api/v1/payments/lenco/verify";

function buildApiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (/^https?:\/\//i.test(path) || path.startsWith("//")) {
    return path;
  }

  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseJson(response) {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
}

function buildQueryPath(basePath, params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  return search.toString() ? `${basePath}?${search.toString()}` : basePath;
}

function getErrorMessage(data) {
  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.detail === "string" && data.detail.trim()) {
    return data.detail;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  const firstValidationMessage = Object.values(data?.errors || {}).flat()?.[0];
  if (typeof firstValidationMessage === "string" && firstValidationMessage.trim()) {
    return firstValidationMessage;
  }

  return "The request could not be completed.";
}

function createApiError(data, response) {
  const error = new Error(getErrorMessage(data));
  error.status = response.status;
  error.data = data;
  return error;
}

async function requestJson(path, { method = "GET", payload, token, headers } = {}) {
  let response;

  try {
    response = await fetch(buildApiUrl(path), {
      method,
      headers: {
        Accept: "application/json",
        ...(payload ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(payload ? { body: JSON.stringify(payload) } : {}),
    });
  } catch (networkError) {
    const error = new Error(
      typeof navigator !== "undefined" && navigator.onLine === false
        ? "You are offline right now."
        : "We could not reach the server.",
    );
    error.status = 0;
    error.code = "NETWORK_ERROR";
    error.cause = networkError;
    throw error;
  }

  const data = await parseJson(response);

  if (!response.ok) {
    throw createApiError(data, response);
  }

  return data;
}

function postJson(path, payload, options = {}) {
  return requestJson(path, { ...options, method: "POST", payload });
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function createLencoPaymentIntent(payload) {
  return postJson(INTENT_ENDPOINT, payload);
}

export async function verifyLencoPayment(reference) {
  return postJson(VERIFY_ENDPOINT, { reference });
}

export async function pollLencoPaymentVerification(
  reference,
  { attempts = 10, intervalMs = 3000 } = {},
) {
  let lastResult = null;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    lastResult = await verifyLencoPayment(reference);

    if (lastResult.paid || lastResult.status === "failed") {
      return lastResult;
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, intervalMs);
    });
  }

  return lastResult;
}

export async function requestPortalOtp(email) {
  return postJson("/api/v1/auth/request-otp", { email });
}

export async function registerPortalAccount(payload) {
  return postJson("/api/v1/auth/register", payload);
}

export async function verifyPortalOtp(payload) {
  return postJson("/api/v1/auth/verify-otp", payload);
}

export async function refreshPortalToken(refreshToken) {
  return postJson("/api/v1/auth/refresh", { refreshToken });
}

export async function fetchPortalMe(accessToken) {
  return requestJson("/api/v1/auth/me", { token: accessToken });
}

export async function logoutPortal(accessToken) {
  return postJson("/api/v1/auth/logout", {}, { token: accessToken });
}

export async function fetchPortalOverview(accessToken, params = {}) {
  return requestJson(buildQueryPath("/api/v1/portal/overview", params), {
    token: accessToken,
  });
}

export async function fetchPortalOrders(accessToken, params = {}) {
  return requestJson(buildQueryPath("/api/v1/portal/orders", params), {
    token: accessToken,
  });
}

export async function fetchPortalTickets(accessToken, params = {}) {
  return requestJson(buildQueryPath("/api/v1/portal/tickets", params), {
    token: accessToken,
  });
}

export async function createCashOnDeliveryBookOrder(payload) {
  return postJson("/api/v1/checkout/book-orders/cod", payload);
}

export async function submitContactMessage(payload) {
  return postJson("/api/v1/contact/messages", payload);
}
