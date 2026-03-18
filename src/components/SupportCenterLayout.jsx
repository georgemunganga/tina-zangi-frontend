import React, { useMemo, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ArrowLeft,
  BookText,
  CreditCard,
  FileText,
  LifeBuoy,
  Menu,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contactDetails } from "@/data/mock";
import { supportArticles, supportSections } from "@/data/support";

const sectionIconMap = {
  "getting-started": BookText,
  "orders-payments": CreditCard,
  events: Ticket,
  legal: ShieldCheck,
};

const groupedSections = supportSections.map((section) => ({
  ...section,
  articles: supportArticles.filter((article) => article.sectionId === section.id),
}));

const SupportNavigation = ({ onNavigate }) => (
  <div className="space-y-8">
    {groupedSections.map((section) => {
      const Icon = sectionIconMap[section.id] || FileText;

      return (
        <section key={section.id}>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#c2410c]">
              <Icon size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                {section.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {section.description}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {section.articles.map((article) => (
              <NavLink
                key={article.slug}
                to={`/help/${article.slug}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `block rounded-[1.5rem] border px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "border-[#fdba74] bg-[#fff7ed] text-[#9a3412] shadow-[0_16px_40px_rgba(249,115,22,0.1)]"
                      : "border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-white"
                  }`
                }
              >
                <p className="text-sm font-semibold">{article.title}</p>
              </NavLink>
            ))}
          </div>
        </section>
      );
    })}
  </div>
);

const SupportCenterLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const primaryLinks = useMemo(
    () =>
      supportArticles.filter((article) =>
        ["overview", "faq"].includes(article.slug),
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7ed_0%,#ffffff_38%,#eef2ff_100%)]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
          <div className="flex items-center gap-3">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-11 rounded-2xl border-slate-200 p-0 lg:hidden"
                >
                  <Menu size={18} />
                  <span className="sr-only">Open support navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[88vw] max-w-sm border-r border-slate-200 bg-[#fcfcfd] p-0"
              >
                <div className="h-full overflow-y-auto p-6">
                  <SheetHeader className="text-left">
                    <Link to="/" className="mb-5 inline-flex w-fit" onClick={() => setMobileNavOpen(false)}>
                      <img
                        src="/images/logo-Zangi.svg"
                        alt="Zangi"
                        className="h-12 w-auto"
                        loading="eager"
                        decoding="async"
                      />
                    </Link>
                    <SheetTitle className="text-2xl font-semibold text-slate-900">
                      Support Center
                    </SheetTitle>
                    <SheetDescription className="leading-6 text-slate-500">
                      Policies, checkout guidance, order help, and event ticket
                      docs.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-8">
                    <SupportNavigation onNavigate={() => setMobileNavOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link
              to="/"
              className="inline-flex transition-all duration-300 hover:scale-[1.02]"
              aria-label="Zangi home"
            >
              <img
                src="/images/logo-Zangi.svg"
                alt="Zangi"
                className="h-12 w-auto sm:h-14"
                loading="eager"
                decoding="async"
              />
            </Link>

            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Support Center
              </p>
              <p className="text-sm text-slate-500">
                Public docs and policy pages for the website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="brandSecondary" size="pillSm" className="hidden sm:inline-flex">
              <Link to="/contact">Contact support</Link>
            </Button>
            <Button asChild variant="brandDark" size="pillSm">
              <Link to="/">
                <ArrowLeft size={15} />
                <span>Back to site</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1480px] gap-8 px-4 py-8 sm:px-6 xl:px-10">
        <aside className="hidden w-[320px] shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Need direction?
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Start with the overview or FAQ, then move into payments,
                delivery, events, or legal policies depending on your question.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {primaryLinks.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/help/${article.slug}`}
                    className="rounded-full bg-[#fff7ed] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#9a3412]"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
              <SupportNavigation />
            </article>

            <article className="rounded-[2rem] bg-black p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
              <div className="flex items-center gap-3">
                <LifeBuoy className="text-[#5eead4]" size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                  Direct support
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/78">
                {contactDetails.responseTime}
              </p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="mt-5 inline-flex text-sm font-semibold text-white underline decoration-white/40 underline-offset-4"
              >
                {contactDetails.email}
              </a>
            </article>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SupportCenterLayout;
