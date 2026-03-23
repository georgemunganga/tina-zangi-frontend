import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const PortalIndexRedirect = () => {
  const [searchParams] = useSearchParams();
  const { session } = useAuth();
  const portalMode =
    session?.portalMode || (["corporate", "wholesale"].includes(session?.role) ? "group" : "individual");
  const groupType =
    session?.groupType || (portalMode === "group" ? (session?.role === "wholesale" ? "wholesale" : "corporate") : null);
  const supportsTickets =
    typeof session?.hasIndividualAccess === "boolean" || typeof session?.hasGroupAccess === "boolean"
      ? Boolean(session?.hasIndividualAccess) || groupType === "corporate"
      : portalMode === "individual" || groupType === "corporate";
  const section = searchParams.get("section");
  const nextParams = new URLSearchParams(searchParams);

  nextParams.delete("section");

  const destination =
    section === "orders"
      ? "/portal/orders"
      : section === "tickets" && supportsTickets
        ? "/portal/tickets"
        : "/portal/overview";
  const search = nextParams.toString();

  return <Navigate to={`${destination}${search ? `?${search}` : ""}`} replace />;
};

export default PortalIndexRedirect;
