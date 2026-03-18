function normalizePortalPath(next) {
  if (!next) {
    return "/portal/overview";
  }

  const [pathname, search = ""] = String(next).split("?");

  if (pathname !== "/portal") {
    return next;
  }

  const params = new URLSearchParams(search);
  const section = params.get("section");
  params.delete("section");

  const target =
    section === "orders"
      ? "/portal/orders"
      : section === "tickets"
        ? "/portal/tickets"
        : "/portal/overview";
  const normalizedSearch = params.toString();

  return `${target}${normalizedSearch ? `?${normalizedSearch}` : ""}`;
}

export function buildPortalNextPath({ next, orderId, ticketId } = {}) {
  if (next) {
    return normalizePortalPath(next);
  }

  const params = new URLSearchParams();

  if (orderId) {
    params.set("order", orderId);
  }

  if (ticketId) {
    params.set("ticket", ticketId);
  }

  const search = params.toString();
  return search ? `/portal/overview?${search}` : "/portal/overview";
}

export function buildPortalSearch(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}
