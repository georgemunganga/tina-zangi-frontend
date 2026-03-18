import React from "react";

const PortalPageHeader = ({ eyebrow, title, description, children }) => (
  <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
    {eyebrow ? (
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        {eyebrow}
      </p>
    ) : null}
    <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
    {description ? (
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
        {description}
      </p>
    ) : null}
    {children ? <div className="mt-4">{children}</div> : null}
  </section>
);

export default PortalPageHeader;
