import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Building2,
  Download,
  Handshake,
  LayoutDashboard,
  Package,
  QrCode,
  Ticket,
  Truck,
} from "lucide-react";
import PortalShell from "@/components/PortalShell";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { books, portalUsers } from "@/data/mock";
import { useCommerce } from "@/providers/CommerceProvider";
import {
  clearPortalSession,
  getPortalSession,
  getStoredOrders,
  getStoredTickets,
} from "@/lib/portal-store";

const getStatusTone = (status) => {
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
};

const MetricCard = ({ label, value, helper }) => (
  <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
      {label}
    </p>
    <p className="mt-4 text-4xl font-semibold text-slate-900">{value}</p>
    <p className="mt-3 text-sm text-slate-500">{helper}</p>
  </article>
);

const TimelineCard = ({ order }) => (
  <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
          {order.id}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">
          {order.productTitle}
        </h3>
      </div>
      <Badge className={`${getStatusTone(order.status)} border-0`}>
        {order.status}
      </Badge>
    </div>

    <div className="mt-6 space-y-3">
      {order.timeline.map((step, index) => {
        const active = index <= order.currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <span
              className={`h-3 w-3 rounded-full ${
                active ? "bg-[#f97316]" : "bg-slate-200"
              }`}
            />
            <p className={`text-sm ${active ? "text-slate-900" : "text-slate-400"}`}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  </article>
);

const TicketPassCard = ({ ticket, formatAmount }) => (
  <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
    <div className="bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_100%)] p-6 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            Digital event pass
          </p>
          <h3 className="mt-3 text-2xl font-semibold">{ticket.eventTitle}</h3>
        </div>
        <Badge className={`${getStatusTone(ticket.status)} border-0`}>
          {ticket.status}
        </Badge>
      </div>
      <p className="mt-5 text-sm text-white/75">
        {ticket.dateLabel} | {ticket.timeLabel}
      </p>
      <p className="mt-1 text-sm text-white/75">{ticket.locationLabel}</p>
    </div>

    <div className="grid gap-6 p-6 lg:grid-cols-[1fr_168px]">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Purchase
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">{ticket.id}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Issued to
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {ticket.ticketHolderName || ticket.buyerName}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Quantity
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {ticket.quantity} pass{ticket.quantity > 1 ? "es" : ""}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Total
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {formatAmount(ticket.total, ticket.currency)}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Portal pass code
          </p>
          <p className="mt-3 text-lg font-semibold text-slate-900">
            {ticket.ticketCode}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This is a mock digital pass state for the frontend phase. It represents
            the QR-enabled ticket artifact that will later be backed by real event
            validation.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-[1.75rem] bg-slate-50 p-5 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-white text-slate-700">
          <QrCode size={48} />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          QR placeholder
        </p>
      </div>
    </div>
  </article>
);

const roleItems = {
  individual: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: Package },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "library", label: "Library", icon: Download },
    { id: "tracking", label: "Tracking", icon: Truck },
  ],
  corporate: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: Package },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "tracking", label: "Fulfillment", icon: Truck },
  ],
  wholesale: [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Bulk Orders", icon: Package },
    { id: "partners", label: "Partners", icon: Handshake },
    { id: "tracking", label: "Fulfillment", icon: Truck },
  ],
};

const PortalDashboardPage = () => {
  const navigate = useNavigate();
  const { formatStoredAmount } = useCommerce();
  const session = getPortalSession();
  const currentRole = session?.role || "individual";
  const supportsTickets = currentRole === "individual" || currentRole === "corporate";
  const items = roleItems[currentRole] || roleItems.individual;
  const [activeSection, setActiveSection] = useState(items[0].id);

  useEffect(() => {
    setActiveSection(items[0].id);
  }, [items]);

  const baseUser = useMemo(
    () => portalUsers.find((user) => user.role === currentRole) || portalUsers[0],
    [currentRole],
  );

  const currentUser = useMemo(
    () => ({
      ...baseUser,
      ...session,
    }),
    [baseUser, session],
  );

  const storedOrders = useMemo(
    () =>
      session
        ? getStoredOrders().filter(
            (order) =>
              order.buyerType === currentRole &&
              (!session.email || !order.email || order.email === session.email),
          )
        : [],
    [currentRole, session],
  );

  const storedTickets = useMemo(() => {
    if (!session || !supportsTickets) {
      return [];
    }

    return getStoredTickets().filter(
      (ticket) =>
        ticket.buyerType === currentRole &&
        (!session.email || !ticket.email || ticket.email === session.email),
    );
  }, [currentRole, session, supportsTickets]);

  const allOrders = useMemo(
    () =>
      [...storedOrders, ...baseUser.orders].sort((left, right) =>
        right.createdAt.localeCompare(left.createdAt),
      ),
    [baseUser.orders, storedOrders],
  );

  const allTickets = useMemo(
    () =>
      supportsTickets
        ? [...storedTickets, ...(baseUser.tickets || [])].sort((left, right) =>
            right.createdAt.localeCompare(left.createdAt),
          )
        : [],
    [baseUser.tickets, storedTickets, supportsTickets],
  );

  const digitalOrders = allOrders.filter((order) => order.format === "digital");
  const physicalOrders = allOrders.filter((order) => order.format === "hardcopy");
  const readyDownloads = digitalOrders.filter(
    (order) => order.status === "Ready to Download",
  );
  const upcomingTickets = allTickets.filter(
    (ticket) => ticket.startDate >= new Date().toISOString().slice(0, 10),
  );
  const totalTicketPasses = allTickets.reduce(
    (sum, ticket) => sum + ticket.quantity,
    0,
  );

  const overviewMetrics = useMemo(() => {
    const metrics = [
      {
        label: "Orders",
        value: allOrders.length,
        helper: "All book orders visible for this role",
      },
      {
        label: "Digital ready",
        value: readyDownloads.length,
        helper: "Orders ready for portal download",
      },
      {
        label: "Physical in motion",
        value: physicalOrders.filter((order) => order.currentStep >= 2).length,
        helper: "Hardcopy orders in active fulfillment",
      },
    ];

    if (supportsTickets) {
      metrics.push(
        {
          label: "Ticket purchases",
          value: allTickets.length,
          helper: "Digital event ticket purchases linked to this account",
        },
        {
          label: "Upcoming events",
          value: upcomingTickets.length,
          helper: "Ticketed events that have not started yet",
        },
        {
          label: "Ticket-ready passes",
          value: totalTicketPasses,
          helper: "Portal-ready digital passes available now",
        },
      );
    }

    return metrics;
  }, [
    allOrders.length,
    allTickets.length,
    physicalOrders,
    readyDownloads.length,
    supportsTickets,
    totalTicketPasses,
    upcomingTickets.length,
  ]);

  const recentActivity = useMemo(
    () =>
      [
        ...allOrders.map((order) => ({
          id: order.id,
          title: order.productTitle,
          createdAt: order.createdAt,
          meta: `${order.id} - ${order.format} - qty ${order.quantity}`,
          status: order.status,
        })),
        ...allTickets.map((ticket) => ({
          id: ticket.id,
          title: ticket.eventTitle,
          createdAt: ticket.createdAt,
          meta: `${ticket.id} - ticket - qty ${ticket.quantity}`,
          status: ticket.status,
        })),
      ]
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .slice(0, 4),
    [allOrders, allTickets],
  );

  if (!session) {
    return <Navigate to="/portal/login" replace />;
  }

  const handleLogout = () => {
    clearPortalSession();
    navigate("/");
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            helper={metric.helper}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Recent activity
          </p>
          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.meta}</p>
                </div>
                <Badge className={`${getStatusTone(item.status)} border-0`}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Portal notes
          </p>
          <div className="mt-6 space-y-4">
            {currentUser.notes.map((note) => (
              <div key={note} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm leading-7 text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
      <Tabs defaultValue="all">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Orders
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Track orders by format and status
            </h2>
          </div>
          <TabsList className="w-full max-w-[280px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
            <TabsTrigger value="hardcopy">Hardcopy</TabsTrigger>
          </TabsList>
        </div>

        {["all", "digital", "hardcopy"].map((value) => {
          const rows =
            value === "all"
              ? allOrders
              : allOrders.filter((order) => order.format === value);

          return (
            <TabsContent key={value} value={value}>
              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-semibold">{order.id}</TableCell>
                        <TableCell>{order.productTitle}</TableCell>
                        <TableCell className="capitalize">{order.format}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusTone(order.status)} border-0`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatStoredAmount(order.total, order.currency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
          Tickets
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Digital event passes connected to this portal account
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          Event tickets remain digital in this version. Each purchase appears as a
          portal pass card with its event details, holder name, quantity, and a QR
          placeholder for the future validation flow.
        </p>
      </div>

      {allTickets.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {allTickets.map((ticket) => (
            <TicketPassCard
              key={ticket.id}
              ticket={ticket}
              formatAmount={formatStoredAmount}
            />
          ))}
        </div>
      ) : (
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-semibold text-slate-900">
            No event tickets have been captured for this account yet.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Purchase a digital event ticket from the public Events section and it
            will appear here as a portal-ready pass.
          </p>
        </article>
      )}
    </div>
  );

  const renderRoleSection = () => {
    if (activeSection === "tickets") {
      return renderTickets();
    }

    if (activeSection === "library") {
      return (
        <div className="grid gap-6 md:grid-cols-2">
          {readyDownloads.length ? (
            readyDownloads.map((order) => (
              <article
                key={order.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                      Download ready
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      {order.productTitle}
                    </h3>
                  </div>
                  <Download className="text-[#0f766e]" size={20} />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Format: {order.format}. This mock portal shows how a ready
                  digital order would become available to the reader.
                </p>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Preview download state
                </button>
              </article>
            ))
          ) : (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
              <p className="text-lg font-semibold text-slate-900">
                No downloads are ready yet.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Digital orders appear here once their status reaches Ready to Download.
              </p>
            </article>
          )}
        </div>
      );
    }

    if (activeSection === "organization" || activeSection === "partners") {
      const label = activeSection === "organization" ? "Organization" : "Partner";
      const copy =
        activeSection === "organization"
          ? "Review grouped orders, quantities, and communication touchpoints for your school or institution."
          : "Monitor large fulfillment waves, partner readiness, and the mix of titles moving through bulk operations.";

      return (
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              {label} summary
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              {currentUser.organizationName || currentUser.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Current catalog mix
            </p>
            <div className="mt-6 space-y-4">
              {books.map((book) => (
                <div key={book.slug} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{book.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{book.type}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      );
    }

    if (activeSection === "tracking") {
      const trackingOrders =
        currentUser.role === "individual" ? physicalOrders : allOrders;

      return trackingOrders.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {trackingOrders.map((order) => (
            <TimelineCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-semibold text-slate-900">
            No tracked orders are active right now.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Hardcopy orders with fulfillment milestones will appear here.
          </p>
        </article>
      );
    }

    return renderOverview();
  };

  return (
    <PortalShell
      user={currentUser}
      title={currentUser.headline}
      subtitle="A role-based dashboard view for orders, tickets, downloads, and tracking with a dedicated portal shell and no public-site chrome."
      items={items}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        {activeSection === "overview" ? renderOverview() : null}
        {activeSection === "orders" ? renderOrders() : null}
        {activeSection !== "overview" && activeSection !== "orders"
          ? renderRoleSection()
          : null}
      </div>
    </PortalShell>
  );
};

export default PortalDashboardPage;
