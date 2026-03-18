import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PortalAuthShell from "@/components/PortalAuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildPortalNextPath, buildPortalSearch } from "@/lib/portal-auth";
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
  const [error, setError] = useState("");
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
    setError("");

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
      if (authError.code === "ACCOUNT_NOT_FOUND") {
        setError(authError.message);
      } else {
        setError(
          authError.message || "We could not start portal verification. Try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PortalAuthShell
      title="Log in to the portal"
      description="Enter your email to verify access, open your dashboard, and view orders, downloads, and event tickets."
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

      {error ? (
        <div className="mt-5 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm leading-7 text-amber-900">{error}</p>
          <Button asChild variant="brand" size="pillSm" className="mt-4">
            <Link to={`/portal/signup?${signupSearch}`}>Create account</Link>
          </Button>
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
          No portal account yet?
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Create one first, then verify the email code to open your dashboard.
        </p>
        <Button asChild variant="brandSecondary" size="pillSm" className="mt-5">
          <Link to={`/portal/signup?${signupSearch}`}>Create account</Link>
        </Button>
      </div>
    </PortalAuthShell>
  );
};

export default PortalLoginPage;
