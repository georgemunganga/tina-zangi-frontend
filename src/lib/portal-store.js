const ORDERS_KEY = "zangi-portal-orders";
const TICKETS_KEY = "zangi-portal-tickets";
const SESSION_KEY = "zangi-portal-session";

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
  return readJson(SESSION_KEY, null);
}

export function setPortalSession(session) {
  writeJson(SESSION_KEY, session);
}

export function clearPortalSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
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
