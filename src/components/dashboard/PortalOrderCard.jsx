import React from "react";
import { ArrowDownToLine, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusTone } from "@/lib/portal-dashboard";

const PortalOrderCard = ({ order, formatAmount }) => {
  const isDigital = order.format === "digital";
  const currentTimelineLabel =
    order.timeline?.[order.currentStep] || order.status || "Received";

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            {order.id}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {order.productTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{order.createdAt}</p>
        </div>
        <Badge className={`${getStatusTone(order.status)} shrink-0 border-0`}>
          {order.status}
        </Badge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Format
          </p>
          <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
            {order.format}
          </p>
        </div>
        <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Quantity
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{order.quantity}</p>
        </div>
        <div className="rounded-[1.25rem] bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Total
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {formatAmount(order.total, order.currency)}
          </p>
        </div>
      </div>

      {isDigital ? (
        <div className="mt-5 rounded-[1.25rem] border border-emerald-200 bg-emerald-50 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-emerald-700">
              <ArrowDownToLine size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900">
                {order.status === "Ready to Download"
                  ? "Download ready"
                  : "Portal delivery in progress"}
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-800/80">
                {order.status === "Ready to Download"
                  ? "This digital order is ready inside your portal."
                  : `Current step: ${currentTimelineLabel}.`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-700">
              <Truck size={17} />
              <p className="text-sm font-semibold">Physical progress</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Step {Math.min((order.currentStep || 0) + 1, order.timeline.length)}/{order.timeline.length}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {order.timeline.map((step, index) => {
              const active = index <= order.currentStep;

              return (
                <span
                  key={step}
                  className={`h-2 rounded-full ${
                    active ? "bg-[#f97316]" : "bg-slate-200"
                  }`}
                />
              );
            })}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{currentTimelineLabel}</p>
        </div>
      )}
    </article>
  );
};

export default PortalOrderCard;
