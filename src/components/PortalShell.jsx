import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getPortalRoleLabel,
  getPortalUserInitials,
} from "@/lib/portal-dashboard";

const SidebarNav = ({ items, compact = false }) => (
  <nav className={compact ? "grid grid-cols-3 gap-2" : "space-y-2"}>
    {items.map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.id}
          to={item.path}
          end
          className={({ isActive }) =>
            compact
              ? `flex flex-col items-center justify-center gap-1 rounded-[1rem] px-3 py-3 text-[11px] font-semibold transition-colors ${
                  isActive
                    ? "bg-[#fff7ed] text-[#c2410c]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              : `flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#fff7ed] text-[#9a3412]"
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                }`
          }
        >
          <Icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      );
    })}
  </nav>
);

const SidebarContent = ({ user, items, onLogout }) => (
  <div className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
    <Link
      to="/"
      className="transition-all duration-300 hover:scale-[1.02]"
      aria-label="Zangi home"
    >
      <img
        src="/images/logo-Zangi.svg"
        alt="Zangi"
        className="h-12 w-auto"
        loading="eager"
        decoding="async"
      />
    </Link>

    <div className="mt-6 rounded-[1.5rem] bg-slate-950 px-4 py-4 text-white">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-sm font-semibold">
          {getPortalUserInitials(user.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
            {getPortalRoleLabel(user.role)} portal
          </p>
        </div>
      </div>
      {user.organizationName ? (
        <p className="mt-3 text-sm text-white/72">{user.organizationName}</p>
      ) : null}
    </div>

    <div className="mt-6 flex-1">
      <SidebarNav items={items} />
    </div>

    <Button
      type="button"
      variant="outline"
      className="mt-6 justify-start rounded-[1rem] border-slate-300 bg-white"
      onClick={onLogout}
    >
      <LogOut size={16} />
      <span>Logout</span>
    </Button>
  </div>
);

const PortalShell = ({ user, items, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe_0%,#f8fafc_38%,#f8fafc_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1520px] gap-6 p-3 sm:p-4 lg:p-6">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-[270px] shrink-0 lg:block">
          <SidebarContent user={user} items={items} onLogout={onLogout} />
        </aside>

        <div className="min-w-0 flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-6">
          <header className="sticky top-3 z-20 mb-4 flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white/92 px-4 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.06)] backdrop-blur sm:px-5 lg:mb-6">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {getPortalUserInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user.organizationName || `${getPortalRoleLabel(user.role)} portal`}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-full border-slate-300 bg-white"
              onClick={onLogout}
            >
              <LogOut size={18} />
              <span className="sr-only">Logout</span>
            </Button>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
        <SidebarNav items={items} compact />
      </nav>
    </div>
  );
};

export default PortalShell;
