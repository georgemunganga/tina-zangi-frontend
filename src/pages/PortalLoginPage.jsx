import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { portalPersonas, portalUsers } from "@/data/mock";
import { setPortalSession } from "@/lib/portal-store";

const PortalLoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedRole = searchParams.get("role") || "individual";
  const orderId = searchParams.get("order");
  const ticketId = searchParams.get("ticket");
  const requestedEmail = searchParams.get("email");

  const [selectedRole, setSelectedRole] = useState(requestedRole);
  const activePersona = useMemo(
    () => portalUsers.find((user) => user.role === selectedRole) || portalUsers[0],
    [selectedRole],
  );
  const [email, setEmail] = useState(requestedEmail || activePersona.email);

  useEffect(() => {
    setEmail(requestedEmail || activePersona.email);
  }, [activePersona.email, requestedEmail]);

  const handleContinue = () => {
    setPortalSession({
      ...activePersona,
      email,
    });
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fed7aa_0%,#fff7ed_24%,#eef2ff_100%)] p-4 sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="rounded-[2.5rem] bg-[linear-gradient(160deg,#7c2d12_0%,#c2410c_45%,#0f766e_100%)] p-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:p-10">
            <Link
              to="/"
              className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/85"
            >
              Back to site
            </Link>
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/60">
                Portal access
              </p>
              <h1
                className="mt-4 text-5xl font-bold leading-none sm:text-6xl"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                A modern dashboard for orders, downloads, tickets, and tracking.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/80">
                The portal is a dedicated experience, separate from the public
                website. It keeps order history, digital event passes,
                fulfillment progress, and role-based views in one place.
              </p>
            </div>

            {orderId || ticketId ? (
              <div className="mt-8 rounded-[2rem] bg-white/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#fde68a]">
                  {ticketId ? "Latest ticket captured" : "Latest order captured"}
                </p>
                <p className="mt-3 text-2xl font-semibold">{ticketId || orderId}</p>
                <p className="mt-2 text-sm text-white/75">
                  Log in to preview how it appears inside the portal.
                </p>
              </div>
            ) : null}
          </section>

          <section className="rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
            <div className="flex items-center gap-2 text-[#0f766e]">
              <Sparkles size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">
                Choose your portal role
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              {portalPersonas.map((persona) => {
                const isActive = persona.role === selectedRole;

                return (
                  <button
                    key={persona.role}
                    type="button"
                    onClick={() => setSelectedRole(persona.role)}
                    className={`rounded-[1.75rem] border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#f97316] bg-[#fff7ed] shadow-[0_18px_50px_rgba(249,115,22,0.14)]"
                        : "border-slate-200 bg-white hover:border-[#fdba74]"
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                      {persona.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {persona.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Portal email
              </label>
              <Input
                type="email"
                className="h-12 rounded-2xl bg-white"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button
              type="button"
              className="mt-8 rounded-full bg-[#c2410c] px-7 text-white hover:bg-[#9a3412]"
              onClick={handleContinue}
            >
              <span>Open dashboard</span>
              <ArrowRight size={16} />
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PortalLoginPage;
