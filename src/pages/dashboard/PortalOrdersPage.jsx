import React, { useMemo, useState } from "react";
import PortalEmptyState from "@/components/dashboard/PortalEmptyState";
import PortalOrderCard from "@/components/dashboard/PortalOrderCard";
import PortalPageHeader from "@/components/dashboard/PortalPageHeader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortalDashboardContext } from "@/pages/dashboard/PortalLayout";

const PortalOrdersPage = () => {
  const { allOrders, error, formatStoredAmount, isLoading } =
    usePortalDashboardContext();
  const [filter, setFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return allOrders;
    }

    return allOrders.filter((order) => order.format === filter);
  }, [allOrders, filter]);

  if (isLoading) {
    return (
      <PortalEmptyState
        title="Loading orders"
        description="Your order list is being loaded from the portal."
      />
    );
  }

  if (error) {
    return <PortalEmptyState title="Orders are unavailable" description={error} />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <PortalPageHeader
        // eyebrow="Orders"
        title="Orders"
        // description="Track digital and hardcopy orders without leaving the same mobile-first workspace."
      >
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-3 rounded-[1rem] bg-slate-100 p-1 sm:max-w-[320px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
            <TabsTrigger value="hardcopy">Hardcopy</TabsTrigger>
          </TabsList>
        </Tabs>
      </PortalPageHeader>

      {filteredOrders.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredOrders.map((order) => (
            <PortalOrderCard
              key={order.reference || order.id}
              order={order}
              formatAmount={formatStoredAmount}
            />
          ))}
        </div>
      ) : (
        <PortalEmptyState
          title="No matching orders yet."
          description="Orders for this filter will appear here once they are linked to this account."
        />
      )}
    </div>
  );
};

export default PortalOrdersPage;
