const DEFAULT_TIMEZONE = "Africa/Lusaka";
const USD_TO_ZMW = 28;

function getDateKey(date, timeZone = DEFAULT_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

export function getEventTicketDisplayLabel(ticket) {
  if (!ticket) {
    return "";
  }

  if (ticket.id === "standard" && ticket.publicRoundLabel) {
    return `${ticket.label} | ${ticket.publicRoundLabel}`;
  }

  return ticket.label;
}

export function resolveEventTicketSales(event, now = new Date()) {
  if (!event) {
    return {
      salesStatus: "closed",
      isSalesOpen: false,
      activeRound: null,
      ticketOptions: [],
      countdownStartsAt: null,
      salesOpenLabel: "",
    };
  }

  const ticketSales = event.ticketSales || {};
  const rounds = Array.isArray(ticketSales.rounds) ? ticketSales.rounds : [];
  const timeZone = ticketSales.timezone || DEFAULT_TIMEZONE;
  const nowMs = now.getTime();
  const opensAtMs = Date.parse(ticketSales.opensAt || event.countdownStartsAt || "");
  const closesAtMs = Date.parse(ticketSales.closesAt || event.startsAt || "");
  const salesStatus =
    Number.isFinite(opensAtMs) && nowMs < opensAtMs
      ? "upcoming"
      : Number.isFinite(closesAtMs) && nowMs > closesAtMs
        ? "closed"
        : "open";
  const currentDateKey = getDateKey(now, timeZone);
  const activeRound =
    rounds.find(
      (round) => currentDateKey >= round.startsOn && currentDateKey <= round.endsOn,
    ) || null;
  const fallbackRound =
    activeRound || (salesStatus === "upcoming" ? rounds[0] : rounds[rounds.length - 1]) || null;
  const ticketOptions = (event.ticketTypes || []).map((ticket) => {
    const round = ticket.id === "standard" ? fallbackRound : activeRound || fallbackRound;
    const priceZmw =
      ticket.id === "standard"
        ? Number(round?.priceZmw || 0)
        : Number(ticket.priceZmw || 0);

    return {
      ...ticket,
      priceZmw,
      price: priceZmw / USD_TO_ZMW,
      roundKey: round?.key || null,
      roundLabel: round?.label || null,
      publicRoundLabel: round?.publicLabel || round?.label || null,
    };
  });

  return {
    salesStatus,
    isSalesOpen: salesStatus === "open",
    activeRound,
    ticketOptions,
    countdownStartsAt: event.countdownStartsAt || ticketSales.opensAt || null,
    salesOpenLabel: ticketSales.salesOpenLabel || "March 25, 2026",
  };
}
