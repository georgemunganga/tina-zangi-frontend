import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PortalAuthShell = ({
  title,
  description,
  orderId,
  ticketId,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fed7aa_0%,#fff7ed_24%,#eef2ff_100%)] p-4 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="rounded-[2.5rem] bg-[linear-gradient(160deg,#7c2d12_0%,#c2410c_45%,#0f766e_100%)] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brandGhost" size="pillSm">
                <Link to="/">Back to site</Link>
              </Button>
              <Button asChild variant="brandGhost" size="pillSm">
                <Link to="/help/overview">Help Center</Link>
              </Button>
            </div>

            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Portal access
              </p>
              <h1
                className="mt-4 text-5xl font-bold leading-none sm:text-6xl"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                {description}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
                Use the portal to manage orders, downloads, physical progress,
                and digital event passes in one place.
              </p>
            </div>

            {orderId || ticketId ? (
              <div className="mt-8 rounded-[2rem] bg-white/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#fde68a]">
                  {ticketId ? "Latest ticket captured" : "Latest order captured"}
                </p>
                <p className="mt-3 text-2xl font-semibold">{ticketId || orderId}</p>
                <p className="mt-2 text-sm text-white/75">
                  Verify your portal access to view it inside the dashboard.
                </p>
              </div>
            ) : null}
          </section>

          <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PortalAuthShell;
