import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchPortalOrders,
  fetchPortalOverview,
  fetchPortalTickets,
} from "@/lib/api";
import { getPortalNavItems } from "@/lib/portal-dashboard";
import { useCommerce } from "@/providers/CommerceProvider";
import { useAuth } from "@/providers/AuthProvider";

function derivePortalMode(session) {
  if (session?.portalMode) {
    return session.portalMode;
  }

  return ["corporate", "wholesale"].includes(session?.role) ? "group" : "individual";
}

function deriveGroupType(session, portalMode) {
  if (session?.groupType) {
    return session.groupType;
  }

  if (portalMode !== "group") {
    return null;
  }

  return session?.role === "wholesale" ? "wholesale" : "corporate";
}

function deriveSupportsTickets(session, portalMode, groupType) {
  if (typeof session?.hasIndividualAccess === "boolean" || typeof session?.hasGroupAccess === "boolean") {
    return Boolean(session?.hasIndividualAccess) || groupType === "corporate";
  }

  return portalMode === "individual" || groupType === "corporate";
}

export function usePortalDashboardData() {
  const location = useLocation();
  const { session, accessToken, isAuthenticated } = useAuth();
  const { formatStoredAmount } = useCommerce();
  const currentRole = derivePortalMode(session);
  const currentGroupType = deriveGroupType(session, currentRole);
  const supportsTickets = deriveSupportsTickets(session, currentRole, currentGroupType);
  const navItems = useMemo(
    () => getPortalNavItems(currentRole, { supportsTickets }),
    [currentRole, supportsTickets],
  );
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
  const [reloadCount, setReloadCount] = useState(0);

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const reloadDashboard = useCallback(() => {
    setReloadCount((current) => current + 1);
  }, []);

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
  }, [
    accessToken,
    isAuthenticated,
    reloadCount,
    searchParams,
    session?.notes,
    supportsTickets,
  ]);

  const currentUser = useMemo(
    () => ({
      id: session?.id || "portal-session",
      role: currentRole,
      portalMode: currentRole,
      groupType: currentGroupType,
      name: session?.name || "Portal User",
      email: session?.email || "",
      organizationName: session?.organizationName || "",
      accountLabel:
        currentRole === "group"
          ? currentGroupType === "wholesale"
            ? "Wholesale account"
            : "Corporate account"
          : "Individual account",
      headline:
        session?.headline ||
        (currentRole === "group"
          ? currentGroupType === "wholesale"
            ? "Your wholesale portal"
            : "Your organization portal"
          : "Your reading hub"),
      notes:
        overviewData.notes?.length
          ? overviewData.notes
          : session?.notes ||
            (currentRole === "group"
              ? currentGroupType === "wholesale"
                ? [
                    "Track bulk book orders and fulfillment progress here.",
                    "Wholesale accounts focus on orders rather than ticket access.",
                  ]
                : [
                    "Track organization orders and any linked event tickets in one place.",
                    "Purchases linked to this email will appear in this group account.",
                  ]
              : [
                  "Review orders, downloads, and tickets in one place.",
                  "New purchases appear here when they match this account email.",
                ]),
    }),
    [currentGroupType, currentRole, overviewData.notes, session],
  );

  return {
    currentRole,
    currentGroupType,
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
    reloadDashboard,
  };
}
