const ORDERS_KEY = "zangi-portal-orders";
const TICKETS_KEY = "zangi-portal-tickets";
const SESSION_KEY = "zangi-portal-session";
const ACCOUNTS_KEY = "zangi-portal-accounts";
const OTP_CHALLENGES_KEY = "zangi-portal-otp-challenges";
const AUTH_STATE_KEY = "zangi-portal-auth-state";
export const PORTAL_SESSION_EVENT = "zangi-portal-session-change";
export const MOCK_PORTAL_OTP_CODE = "123456";

function readJson(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function emitSessionChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(PORTAL_SESSION_EVENT));
}

export function normalizePortalEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function getStoredOrders() {
  return readJson(ORDERS_KEY, []);
}

export function addStoredOrder(order) {
  const currentOrders = getStoredOrders();
  writeJson(ORDERS_KEY, [order, ...currentOrders]);
}

export function getStoredTickets() {
  return readJson(TICKETS_KEY, []);
}

export function addStoredTicketPurchase(ticketPurchase) {
  const currentTickets = getStoredTickets();
  writeJson(TICKETS_KEY, [ticketPurchase, ...currentTickets]);
}

export function getPortalSession() {
  const authState = readJson(AUTH_STATE_KEY, null);
  return authState?.session || readJson(SESSION_KEY, null);
}

export function setPortalSession(session) {
  writeJson(SESSION_KEY, session);
  emitSessionChange();
}

export function clearPortalSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
  emitSessionChange();
}

export function getPortalAuthState() {
  return readJson(AUTH_STATE_KEY, null);
}

export function setPortalAuthState(authState) {
  writeJson(AUTH_STATE_KEY, authState);

  if (authState?.session) {
    writeJson(SESSION_KEY, authState.session);
  } else if (typeof window !== "undefined") {
    window.localStorage.removeItem(SESSION_KEY);
  }

  emitSessionChange();
}

export function clearPortalAuthState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STATE_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  emitSessionChange();
}

export function getPortalAccounts() {
  return readJson(ACCOUNTS_KEY, []);
}

export function findPortalAccountByEmail(email) {
  const normalizedEmail = normalizePortalEmail(email);

  return getPortalAccounts().find(
    (account) => normalizePortalEmail(account.email) === normalizedEmail,
  );
}

export function savePortalAccount(account) {
  const normalizedEmail = normalizePortalEmail(account.email);
  const nextAccount = {
    ...account,
    email: normalizedEmail,
  };
  const remainingAccounts = getPortalAccounts().filter(
    (item) => normalizePortalEmail(item.email) !== normalizedEmail,
  );

  writeJson(ACCOUNTS_KEY, [nextAccount, ...remainingAccounts]);
  return nextAccount;
}

export function getPortalOtpChallenges() {
  return readJson(OTP_CHALLENGES_KEY, []);
}

export function createPortalOtpChallenge(payload) {
  const normalizedEmail = normalizePortalEmail(payload.email);
  const challenge = {
    email: normalizedEmail,
    code: MOCK_PORTAL_OTP_CODE,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  const remainingChallenges = getPortalOtpChallenges().filter(
    (item) => normalizePortalEmail(item.email) !== normalizedEmail,
  );

  writeJson(OTP_CHALLENGES_KEY, [challenge, ...remainingChallenges]);
  return challenge;
}

export function getPortalOtpChallenge(email) {
  const normalizedEmail = normalizePortalEmail(email);

  return getPortalOtpChallenges().find(
    (challenge) => normalizePortalEmail(challenge.email) === normalizedEmail,
  );
}

export function clearPortalOtpChallenge(email) {
  const normalizedEmail = normalizePortalEmail(email);
  const remainingChallenges = getPortalOtpChallenges().filter(
    (challenge) => normalizePortalEmail(challenge.email) !== normalizedEmail,
  );

  writeJson(OTP_CHALLENGES_KEY, remainingChallenges);
}

export function createMockOrder(payload) {
  const isDigital = payload.format === "digital";
  const timeline = isDigital
    ? ["Received", "Confirmed", "Preparing", "Ready to Download"]
    : ["Received", "Confirmed", "Processing", "Shipped", "Delivered"];

  return {
    id: `ZG-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString().slice(0, 10),
    currentStep: 0,
    status: timeline[0],
    timeline,
    ...payload,
  };
}

function createTicketCode() {
  return `PASS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function createMockTicketPurchase(payload) {
  return {
    id: `ZT-${Math.floor(1000 + Math.random() * 9000)}`,
    purchaseType: "event-ticket",
    status: "Ticket Ready",
    ticketCode: createTicketCode(),
    createdAt: new Date().toISOString().slice(0, 10),
    ...payload,
  };
}
