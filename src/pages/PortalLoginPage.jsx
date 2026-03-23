import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PortalAuthShell from "@/components/PortalAuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildPortalNextPath, buildPortalSearch } from "@/lib/portal-auth";
import RequestStatusNotice from "@/components/ui/request-status-notice";
import { getRequestHint, getRequestMessage } from "@/lib/network";
import { useAuth } from "@/providers/AuthProvider";

const PortalLoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { requestLoginOtp } = useAuth();
  const requestedRole = searchParams.get("role") || "individual";
  const requestedEmail = searchParams.get("email") || "";
  const orderId = searchParams.get("order");
  const ticketId = searchParams.get("ticket");
  const next = searchParams.get("next");
  const nextPath = buildPortalNextPath({ next, orderId, ticketId });
  const [email, setEmail] = useState(requestedEmail);
  const [requestState, setRequestState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmail(requestedEmail);
  }, [requestedEmail]);

  const signupSearch = buildPortalSearch({
    email,
    role: requestedRole,
    next: nextPath,
    order: orderId,
    ticket: ticketId,
  });

  const handleContinue = async () => {
    setIsSubmitting(true);
    setRequestState({
      tone: "loading",
      title: "Sending your access code",
      message: "We are asking the portal to send a fresh verification code to this email.",
    });

    try {
      const result = await requestLoginOtp(email);
      const otpSearch = buildPortalSearch({
        email: result.email,
        role: result.role || requestedRole,
        next: nextPath,
        order: orderId,
        ticket: ticketId,
        devCode: result.devOtpCode,
      });

      navigate(`/portal/verify-otp?${otpSearch}`);
    } catch (authError) {
      const message = getRequestMessage(
        authError,
        "We could not start portal verification. Try again.",
      );
      const hint = getRequestHint(authError);
      if (authError.code === "ACCOUNT_NOT_FOUND") {
        setRequestState({
          tone: "error",
          title: "Portal account not found",
          message,
          hint,
        });
      } else {
        setRequestState({
          tone: authError?.code === "NETWORK_ERROR" || authError?.status === 0 ? "network" : "error",
          title: "We could not send the code",
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
      title="Log in to the portal"
      description="Use the same email you used at checkout to receive a code and open your dashboard, orders, downloads, and event tickets."
      orderId={orderId}
      ticketId={ticketId}
    >
      <div className="flex items-center gap-2 text-[#0f766e]">
        <Sparkles size={18} />
        <p className="text-sm font-semibold uppercase tracking-[0.16em]">
          Email verification
        </p>
      </div>

      <div className="mt-8 grid gap-2">
        <label className="text-sm font-medium text-slate-700">Portal email</label>
        <Input
          type="email"
          className="h-12 rounded-2xl bg-white"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
        />
      </div>

      {requestState ? (
        <div className="mt-5">
          <RequestStatusNotice
            tone={requestState.tone}
            title={requestState.title}
            message={requestState.message}
            hint={requestState.hint}
          />
          {requestState.title === "Portal account not found" ? (
            <Button asChild variant="brand" size="pillSm" className="mt-4">
              <Link to={`/portal/signup?${signupSearch}`}>Create account manually</Link>
            </Button>
          ) : null}
        </div>
      ) : null}

      <Button
        type="button"
        variant="brand"
        size="pillLg"
        className="mt-8"
        onClick={handleContinue}
        disabled={!email.trim() || isSubmitting}
      >
        <span>{isSubmitting ? "Sending code..." : "Continue with email"}</span>
        <ArrowRight size={16} />
      </Button>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          Have not bought anything yet?
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Purchases create portal access automatically. If you have not bought yet, you can still create an account manually.
        </p>
        <Button asChild variant="brandSecondary" size="pillSm" className="mt-5">
          <Link to={`/portal/signup?${signupSearch}`}>Create account manually</Link>
        </Button>
      </div>
    </PortalAuthShell>
  );
};

export default PortalLoginPage;
