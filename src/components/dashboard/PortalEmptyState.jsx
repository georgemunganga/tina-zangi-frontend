import React from "react";
import { Button } from "@/components/ui/button";

const PortalEmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  isActionBusy = false,
}) => (
  <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
    <p className="text-lg font-semibold text-slate-900">{title}</p>
    <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    {actionLabel && onAction ? (
      <Button
        type="button"
        variant="brandSecondary"
        size="pillSm"
        className="mt-5"
        onClick={onAction}
        disabled={isActionBusy}
      >
        {actionLabel}
      </Button>
    ) : null}
  </article>
);

export default PortalEmptyState;
