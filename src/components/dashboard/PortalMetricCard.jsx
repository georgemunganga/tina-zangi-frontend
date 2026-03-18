import React from "react";

const PortalMetricCard = ({ label, value, helper }) => (
  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      {label}
    </p>
    <p className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">{value}</p>
    <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>
  </article>
);

export default PortalMetricCard;
