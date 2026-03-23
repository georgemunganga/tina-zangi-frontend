import React from "react";
import { Navigate } from "react-router-dom";
import PortalEmptyState from "@/components/dashboard/PortalEmptyState";
import PortalPageHeader from "@/components/dashboard/PortalPageHeader";
import PortalTicketPassCard from "@/components/dashboard/PortalTicketPassCard";
import { usePortalDashboardContext } from "@/pages/dashboard/PortalLayout";

const PortalTicketsPage = () => {
  const {
    allTickets,
    error,
    formatStoredAmount,
    isLoading,
    reloadDashboard,
    supportsTickets,
  } =
    usePortalDashboardContext();

  if (!supportsTickets) {
    return <Navigate to="/portal/orders" replace />;
  }

  if (isLoading) {
    return (
      <PortalEmptyState
        title="Loading tickets"
        description="Your event passes are being loaded from the portal."
      />
    );
  }

  if (error) {
    return (
      <PortalEmptyState
        title="Tickets are unavailable"
        description={error}
        actionLabel="Try again"
        onAction={reloadDashboard}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <PortalPageHeader
        // eyebrow="Tickets"
        title="Event Tickets"
        // description="Every event ticket linked to this account appears here with its pass code and QR placeholder."
      />

      {allTickets.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {allTickets.map((ticket) => (
            <PortalTicketPassCard
              key={ticket.reference || ticket.id}
              ticket={ticket}
              formatAmount={formatStoredAmount}
            />
          ))}
        </div>
      ) : (
        <PortalEmptyState
          title="No event tickets have been captured yet."
          description="Digital passes will appear here once this account completes a ticket purchase."
        />
      )}
    </div>
  );
};

export default PortalTicketsPage;
