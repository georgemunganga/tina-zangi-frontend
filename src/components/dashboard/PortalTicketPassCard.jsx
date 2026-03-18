import React from "react";
import { QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusTone } from "@/lib/portal-dashboard";

const PortalTicketPassCard = ({ ticket, formatAmount }) => (
  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Digital pass
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          {ticket.eventTitle}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {ticket.dateLabel} | {ticket.timeLabel}
        </p>
        <p className="text-sm leading-6 text-slate-500">{ticket.locationLabel}</p>
      </div>
      <Badge className={`${getStatusTone(ticket.status)} shrink-0 border-0`}>
        {ticket.status}
      </Badge>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Ticket type
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">
          {ticket.ticketTypeLabel || "Standard"}
        </p>
      </div>
      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Holder
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">
          {ticket.ticketHolderName || ticket.buyerName}
        </p>
      </div>
      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Quantity
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">
          {ticket.quantity} pass{ticket.quantity > 1 ? "es" : ""}
        </p>
      </div>
      <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Total
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">
          {formatAmount(ticket.total, ticket.currency)}
        </p>
      </div>
    </div>

    <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px]">
      <div className="rounded-[1.25rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          Pass code
        </p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{ticket.ticketCode}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Purchase {ticket.id}
        </p>
      </div>

      <div className="flex items-center justify-center rounded-[1.25rem] border border-dashed border-slate-200 bg-white px-4 py-4 text-slate-600">
        <div className="text-center">
          <QrCode size={40} className="mx-auto" />
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            QR
          </p>
        </div>
      </div>
    </div>
  </article>
);

export default PortalTicketPassCard;
