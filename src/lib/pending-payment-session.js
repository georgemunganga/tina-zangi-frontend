const STORAGE_KEY = "zangi-pending-payment-sessions";

function readSessions() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function writeSessions(value) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function savePendingPaymentSession(reference, payload) {
  const sessions = readSessions();
  sessions[reference] = payload;
  writeSessions(sessions);
}

export function getPendingPaymentSession(reference) {
  return readSessions()[reference] || null;
}

export function clearPendingPaymentSession(reference) {
  const sessions = readSessions();
  delete sessions[reference];
  writeSessions(sessions);
}
