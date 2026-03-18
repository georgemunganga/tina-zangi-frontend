import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchPortalOrders,
  fetchPortalOverview,
  fetchPortalTickets,
} from "@/lib/api";
import { getPortalNavItems } from "@/lib/portal-dashboard";
import { useCommerce } from "@/providers/CommerceProvider";
import { useAuth } from "@/providers/AuthProvider";

export function usePortalDashboardData() {
  const location = useLocation();
  const { session, accessToken, isAuthenticated } = useAuth();
  const { formatStoredAmount } = useCommerce();
  const currentRole = session?.role || "individual";
  const supportsTickets = currentRole === "individual" || currentRole === "corporate";
  const navItems = useMemo(() => getPortalNavItems(currentRole), [currentRole]);
  const [overviewData, setOverviewData] = useState({
    latestReference: null,
    metrics: [],
    recentActivity: [],
    notes: [],
    supportsTickets,
  });
  const [ordersData, setOrdersData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setOverviewData({
        latestReference: null,
        metrics: [],
        recentActivity: [],
        notes: [],
        supportsTickets,
      });
      setOrdersData([]);
      setTicketsData([]);
      setIsLoading(false);
      setError("");
      return;
    }

    let isCancelled = false;

    const loadDashboard = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [overviewResult, ordersResult, ticketsResult] = await Promise.all([
          fetchPortalOverview(accessToken, {
            order: searchParams.get("order"),
            ticket: searchParams.get("ticket"),
          }),
          fetchPortalOrders(accessToken, { format: "all" }),
          supportsTickets
            ? fetchPortalTickets(accessToken)
            : Promise.resolve({ data: [] }),
        ]);

        if (isCancelled) {
          return;
        }

        setOverviewData({
          latestReference: overviewResult.latestReference || null,
          metrics: overviewResult.metrics || [],
          recentActivity: (overviewResult.recentActivity || []).map((item) => ({
            id: item.reference || item.id || item.title,
            title: item.title,
            meta: item.reference || item.type,
            status: item.status,
            createdAt: item.createdAt,
          })),
          notes: overviewResult.notes || [],
          supportsTickets: overviewResult.supportsTickets ?? supportsTickets,
        });
        setOrdersData(ordersResult.data || []);
        setTicketsData(ticketsResult.data || []);
      } catch (loadError) {
        if (isCancelled) {
          return;
        }

        setOverviewData((current) => ({
          ...current,
          notes:
            session?.notes ||
            [
              "We could not load this portal data yet.",
              "Try refreshing the page after logging in again.",
            ],
        }));
        setOrdersData([]);
        setTicketsData([]);
        setError(loadError.message || "We could not load the portal right now.");
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isCancelled = true;
    };
  }, [accessToken, isAuthenticated, searchParams, session?.notes, supportsTickets]);

  const currentUser = useMemo(
    () => ({
      id: session?.id || "portal-session",
      role: currentRole,
      name: session?.name || "Portal User",
      email: session?.email || "",
      organizationName: session?.organizationName || "",
      headline:
        session?.headline ||
        (currentRole === "wholesale"
          ? "Your wholesale portal"
          : currentRole === "corporate"
            ? "Your organization portal"
            : "Your reading hub"),
      notes:
        overviewData.notes?.length
          ? overviewData.notes
          : session?.notes ||
            (currentRole === "wholesale"
              ? [
                  "Track bulk book orders and fulfillment progress here.",
                  "Wholesale accounts focus on orders rather than ticket access.",
                ]
              : [
                  "Review orders, downloads, and tickets in one place.",
                  "New purchases appear here when they match this account email.",
                ]),
    }),
    [currentRole, overviewData.notes, session],
  );

  return {
    currentRole,
    currentUser,
    navItems,
    supportsTickets: overviewData.supportsTickets ?? supportsTickets,
    allOrders: ordersData,
    allTickets: ticketsData,
    overviewMetrics: overviewData.metrics || [],
    recentActivity: overviewData.recentActivity || [],
    latestReference: overviewData.latestReference || null,
    formatStoredAmount,
    isLoading,
    error,
  };
}
