import React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusTone } from "@/lib/portal-dashboard";

const PortalRecentActivity = ({ items }) => (
  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      Recent activity
    </p>
    <div className="mt-5 space-y-3">
      {items.length ? (
        items.map((item) => (
          <div
            key={item.id}
            className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{item.meta}</p>
              </div>
              <Badge className={`${getStatusTone(item.status)} shrink-0 border-0`}>
                {item.status}
              </Badge>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm leading-7 text-slate-600">
          Activity will appear here as orders and tickets are added to this account.
        </p>
      )}
    </div>
  </article>
);

export default PortalRecentActivity;
