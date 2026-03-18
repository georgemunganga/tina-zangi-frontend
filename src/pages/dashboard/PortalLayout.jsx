import React from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import PortalShell from "@/components/PortalShell";
import { usePortalDashboardData } from "@/hooks/usePortalDashboardData";
import { useAuth } from "@/providers/AuthProvider";

const PortalLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dashboardData = usePortalDashboardData();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <PortalShell
      user={dashboardData.currentUser}
      items={dashboardData.navItems}
      onLogout={handleLogout}
    >
      <Outlet context={dashboardData} />
    </PortalShell>
  );
};

export function usePortalDashboardContext() {
  return useOutletContext();
}

export default PortalLayout;
