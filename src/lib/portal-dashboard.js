import { LayoutDashboard, Package, Ticket } from "lucide-react";

const basePortalNavItems = [
  {
    id: "overview",
    label: "Overview",
    path: "/portal/overview",
    icon: LayoutDashboard,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/portal/orders",
    icon: Package,
  },
];

const ticketsPortalNavItem = {
  id: "tickets",
  label: "Tickets",
  path: "/portal/tickets",
  icon: Ticket,
};

export function getPortalNavItems(portalMode, { supportsTickets = true } = {}) {
  if (portalMode === "group" && !supportsTickets) {
    return basePortalNavItems;
  }

  return supportsTickets
    ? [...basePortalNavItems, ticketsPortalNavItem]
    : basePortalNavItems;
}

export function getPortalRoleLabel(portalMode, groupType = null) {
  if (portalMode === "group") {
    if (groupType === "wholesale") {
      return "Wholesale";
    }

    if (groupType === "corporate") {
      return "Corporate";
    }

    return "Group";
  }

  return "Individual";
}

export function getStatusTone(status) {
  if (status === "Ready to Download" || status === "Ticket Ready") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (status === "Delivered") {
    return "bg-sky-100 text-sky-700";
  }
  if (status === "Shipped") {
    return "bg-blue-100 text-blue-700";
  }
  if (status === "Processing" || status === "Preparing") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-slate-100 text-slate-700";
}

export function getPortalUserInitials(name) {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "ZU";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}
