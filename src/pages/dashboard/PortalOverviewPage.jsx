import React from "react";
import PortalEmptyState from "@/components/dashboard/PortalEmptyState";
import PortalMetricCard from "@/components/dashboard/PortalMetricCard";
import PortalRecentActivity from "@/components/dashboard/PortalRecentActivity";
import { usePortalDashboardContext } from "@/pages/dashboard/PortalLayout";

const PortalOverviewPage = () => {
  const {
    currentUser,
    error,
    isLoading,
    latestReference,
    overviewMetrics,
    recentActivity,
  } = usePortalDashboardContext();

  if (isLoading) {
    return (
      <PortalEmptyState
        title="Loading your portal"
        description="Your latest orders, tickets, and activity are loading now."
      />
    );
  }

  if (error) {
    return <PortalEmptyState title="Portal data is unavailable" description={error} />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {latestReference ? (
        <article className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 shadow-[0_16px_45px_rgba(15,23,42,0.04)] sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a3412]">
            Latest reference
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            {latestReference.reference}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {latestReference.title
              ? `${latestReference.title} is now linked to this portal account.`
              : "This portal account is ready to track your latest purchase."}
          </p>
        </article>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <PortalMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            helper={metric.helper}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <PortalRecentActivity items={recentActivity} />

        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Need-to-know
          </p>
          <div className="mt-5 space-y-3">
            {currentUser.notes.map((note) => (
              <div key={note} className="rounded-[1.25rem] bg-slate-50 px-4 py-4">
                <p className="text-sm leading-7 text-slate-600">{note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default PortalOverviewPage;
