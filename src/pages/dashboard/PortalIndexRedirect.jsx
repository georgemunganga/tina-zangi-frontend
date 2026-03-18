import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

const PortalIndexRedirect = () => {
  const [searchParams] = useSearchParams();
  const { session } = useAuth();
  const section = searchParams.get("section");
  const nextParams = new URLSearchParams(searchParams);

  nextParams.delete("section");

  const destination =
    section === "orders"
      ? "/portal/orders"
      : section === "tickets" && session?.role !== "wholesale"
        ? "/portal/tickets"
        : "/portal/overview";
  const search = nextParams.toString();

  return <Navigate to={`${destination}${search ? `?${search}` : ""}`} replace />;
};

export default PortalIndexRedirect;
