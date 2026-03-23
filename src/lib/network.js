export function isOffline() {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

export function getRequestHint(error) {
  if (isOffline()) {
    return "You appear to be offline. Reconnect to the internet and try again.";
  }

  if (error?.code === "NETWORK_ERROR" || error?.status === 0) {
    return "We could not reach the server. Check your connection and try again shortly.";
  }

  if (error?.status >= 500) {
    return "The server is having trouble finishing the request. Please try again in a moment.";
  }

  if (error?.status === 401 || error?.status === 403) {
    return "Your access may have expired. Refresh the page or sign in again.";
  }

  if (error?.status === 404) {
    return "The requested resource could not be found. Refresh and try again.";
  }

  return "";
}

export function getRequestMessage(error, fallbackMessage) {
  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  if (isOffline()) {
    return "You are offline right now.";
  }

  return fallbackMessage;
}

export function isRetryableRequest(error) {
  if (isOffline()) {
    return true;
  }

  return error?.code === "NETWORK_ERROR" || error?.status === 0 || error?.status >= 500;
}
