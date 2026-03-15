import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SidebarNav = ({ items, activeSection, onSectionChange }) => (
  <nav className="space-y-2">
    {items.map((item) => {
      const Icon = item.icon;
      const isActive = item.id === activeSection;

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onSectionChange(item.id)}
          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
            isActive
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
          }`}
        >
          <Icon size={18} />
          <span>{item.label}</span>
        </button>
      );
    })}
  </nav>
);

const SidebarContent = ({
  user,
  items,
  activeSection,
  onSectionChange,
  onLogout,
}) => (
  <div className="flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
    <Link
      to="/"
      className="rounded-2xl bg-white px-4 py-4 text-3xl font-bold tracking-wide text-[#7c2d12] shadow-sm"
      style={{ fontFamily: "'ADVENTURES', sans-serif" }}
    >
      ZANGI
    </Link>

    <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
        {user.role}
      </p>
      <p className="mt-2 text-lg font-semibold">{user.name}</p>
      {user.organizationName ? (
        <p className="mt-1 text-sm text-white/70">{user.organizationName}</p>
      ) : null}
    </div>

    <div className="mt-6 flex-1">
      <SidebarNav
        items={items}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
    </div>

    <Button
      type="button"
      variant="outline"
      className="mt-6 justify-start rounded-2xl border-slate-300 bg-white"
      onClick={onLogout}
    >
      <LogOut size={16} />
      <span>Exit portal</span>
    </Button>
  </div>
);

const PortalShell = ({
  user,
  title,
  subtitle,
  items,
  activeSection,
  onSectionChange,
  onLogout,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe_0%,#f8fafc_38%,#f8fafc_100%)] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:p-6">
        <aside className="hidden lg:block">
          <SidebarContent
            user={user}
            items={items}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onLogout={onLogout}
          />
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="mb-6 flex items-start justify-between gap-4 rounded-[2rem] border border-slate-200/80 bg-white/80 px-5 py-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                Portal dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right sm:block">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Logged in as
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {user.name}
                </p>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl border-slate-300 bg-white lg:hidden"
                  >
                    <Menu size={16} />
                    <span>Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] bg-[#f8fafc] p-4">
                  <SidebarContent
                    user={user}
                    items={items}
                    activeSection={activeSection}
                    onSectionChange={onSectionChange}
                    onLogout={onLogout}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default PortalShell;
