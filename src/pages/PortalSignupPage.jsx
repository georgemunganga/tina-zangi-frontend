import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PortalAuthShell from "@/components/PortalAuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { portalPersonas } from "@/data/mock";
import { buildPortalNextPath, buildPortalSearch } from "@/lib/portal-auth";
import RequestStatusNotice from "@/components/ui/request-status-notice";
import { getRequestHint, getRequestMessage } from "@/lib/network";
import { useAuth } from "@/providers/AuthProvider";

const PortalSignupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { registerAccount } = useAuth();
  const requestedRole = searchParams.get("role") || "individual";
  const requestedEmail = searchParams.get("email") || "";
  const orderId = searchParams.get("order");
  const ticketId = searchParams.get("ticket");
  const next = searchParams.get("next");
  const nextPath = buildPortalNextPath({ next, orderId, ticketId });
  const [formState, setFormState] = useState({
    role: requestedRole,
    name: "",
    email: requestedEmail,
    phone: "",
    organizationName: "",
  });
  const [requestState, setRequestState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormState((current) => ({
      ...current,
      role: requestedRole,
      email: requestedEmail,
    }));
  }, [requestedEmail, requestedRole]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRequestState({
      tone: "loading",
      title: "Creating your portal account",
      message: "We are setting up the account and preparing the verification code now.",
    });
    setIsSubmitting(true);

    try {
      const account = await registerAccount(formState);
      const otpSearch = buildPortalSearch({
        email: account.email,
        role: account.role,
        next: nextPath,
        order: orderId,
        ticket: ticketId,
        devCode: account.devOtpCode,
      });

      navigate(`/portal/verify-otp?${otpSearch}`);
    } catch (authError) {
      const message = getRequestMessage(
        authError,
        "We could not create your portal account. Try again.",
      );
      const hint = getRequestHint(authError);
      if (authError.code === "ACCOUNT_EXISTS") {
        setRequestState({
          tone: "error",
          title: "Portal account already exists",
          message,
          hint,
        });
      } else {
        setRequestState({
          tone: authError?.code === "NETWORK_ERROR" || authError?.status === 0 ? "network" : "error",
          title: "We could not create the account",
          message,
          hint,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PortalAuthShell
      title="Create your portal account"
      description="Use this only if you have not bought from the site yet. Purchases already create portal access automatically for the same email."
      orderId={orderId}
      ticketId={ticketId}
    >
      <div className="flex items-center gap-2 text-[#0f766e]">
        <Sparkles size={18} />
        <p className="text-sm font-semibold uppercase tracking-[0.16em]">
          Portal signup
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-3">
          <label className="text-sm font-medium text-slate-700">Portal role</label>
          <div className="grid gap-3">
            {portalPersonas.map((persona) => (
              <button
                key={persona.role}
                type="button"
                onClick={() =>
                  setFormState((current) => ({ ...current, role: persona.role }))
                }
                className={`rounded-[1.5rem] border p-4 text-left transition ${
                  formState.role === persona.role
                    ? "border-[#f97316] bg-[#fff7ed]"
                    : "border-slate-200 bg-white hover:border-[#fdba74]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                  {persona.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {persona.summary}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Full name</label>
            <Input
              className="h-12 rounded-2xl bg-white"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              className="h-12 rounded-2xl bg-white"
              value={formState.email}
              onChange={(event) =>
                setFormState((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Phone</label>
            <Input
              className="h-12 rounded-2xl bg-white"
              value={formState.phone}
              onChange={(event) =>
                setFormState((current) => ({ ...current, phone: event.target.value }))
              }
              required
            />
          </div>

          {formState.role !== "individual" ? (
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Organization name
              </label>
              <Input
                className="h-12 rounded-2xl bg-white"
                value={formState.organizationName}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    organizationName: event.target.value,
                  }))
                }
                required
              />
            </div>
          ) : null}
        </div>

        {requestState ? (
          <div>
            <RequestStatusNotice
              tone={requestState.tone}
              title={requestState.title}
              message={requestState.message}
              hint={requestState.hint}
            />
            {requestState.title === "Portal account already exists" ? (
              <Button asChild variant="brand" size="pillSm" className="mt-4">
                <Link
                  to={`/portal/login?${buildPortalSearch({
                    email: formState.email,
                    role: formState.role,
                    next: nextPath,
                    order: orderId,
                    ticket: ticketId,
                  })}`}
                >
                  Go to login
                </Link>
              </Button>
            ) : null}
          </div>
        ) : null}

        <Button type="submit" variant="brand" size="pillLg" disabled={isSubmitting}>
          <span>{isSubmitting ? "Creating account..." : "Create account"}</span>
          <ArrowRight size={16} />
        </Button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-600">
          Already bought something or already have portal access?{" "}
          <Link
            to={`/portal/login?${buildPortalSearch({
              email: formState.email,
              role: formState.role,
              next: nextPath,
              order: orderId,
              ticket: ticketId,
            })}`}
            className="font-semibold text-[#c2410c]"
          >
            Log in
          </Link>
        </p>
      </div>
    </PortalAuthShell>
  );
};

export default PortalSignupPage;
