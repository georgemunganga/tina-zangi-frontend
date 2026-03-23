import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import PortalAuthShell from "@/components/PortalAuthShell";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { buildPortalNextPath, buildPortalSearch } from "@/lib/portal-auth";
import RequestStatusNotice from "@/components/ui/request-status-notice";
import { getRequestHint, getRequestMessage } from "@/lib/network";
import { useAuth } from "@/providers/AuthProvider";

const PortalVerifyOtpPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const email = searchParams.get("email");
  const role = searchParams.get("role") || "individual";
  const orderId = searchParams.get("order");
  const ticketId = searchParams.get("ticket");
  const next = searchParams.get("next");
  const devCode = searchParams.get("devCode");
  const nextPath = buildPortalNextPath({ next, orderId, ticketId });
  const [code, setCode] = useState("");
  const [requestState, setRequestState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSearch = useMemo(
    () =>
      buildPortalSearch({
        email,
        role,
        next: nextPath,
        order: orderId,
        ticket: ticketId,
      }),
    [email, nextPath, orderId, role, ticketId],
  );

  if (!email) {
    return <Navigate to="/portal/login" replace />;
  }

  const handleVerify = async () => {
    setIsSubmitting(true);
    setRequestState({
      tone: "loading",
      title: "Verifying your code",
      message: "We are checking the code and opening the linked portal account.",
    });

    try {
      await verifyOtp({ email, code });
      navigate(nextPath, { replace: true });
    } catch (authError) {
      const message = getRequestMessage(
        authError,
        "We could not verify portal access. Start the login flow again.",
      );
      const hint = getRequestHint(authError);
      if (authError.code === "OTP_INVALID") {
        setRequestState({
          tone: "error",
          title: "That code did not work",
          message,
          hint,
        });
      } else {
        setRequestState({
          tone: authError?.code === "NETWORK_ERROR" || authError?.status === 0 ? "network" : "error",
          title: "We could not verify the code",
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
      title="Verify your access"
      description="Enter the six-digit code sent to your purchase email to finish opening your portal account."
      orderId={orderId}
      ticketId={ticketId}
    >
      <div className="flex items-center gap-2 text-[#0f766e]">
        <Sparkles size={18} />
        <p className="text-sm font-semibold uppercase tracking-[0.16em]">
          OTP verification
        </p>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-[#fffaf5] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
          Portal email
        </p>
        <p className="mt-2 text-base font-semibold text-slate-900">{email}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Enter the six-digit code sent to this email address.
        </p>
        {devCode ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Local dev code: <span className="font-semibold text-slate-900">{devCode}</span>
          </p>
        ) : null}
      </div>

      <div className="mt-8">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={setCode}
          containerClassName="justify-start"
        >
          <InputOTPGroup className="gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-12 w-12 rounded-2xl border border-slate-300 text-base"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {requestState ? (
        <RequestStatusNotice
          tone={requestState.tone}
          title={requestState.title}
          message={requestState.message}
          hint={requestState.hint}
          className="mt-5"
        />
      ) : null}

      <Button
        type="button"
        variant="brand"
        size="pillLg"
        className="mt-8"
        onClick={handleVerify}
        disabled={code.length !== 6 || isSubmitting}
      >
        <span>{isSubmitting ? "Verifying..." : "Verify and open portal"}</span>
        <ArrowRight size={16} />
      </Button>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-600">
          Need to change your email or request a new code?{" "}
          <Button asChild variant="link" className="h-auto px-0 text-[#c2410c]">
            <Link to={`/portal/login?${loginSearch}`}>Go back</Link>
          </Button>
        </p>
      </div>
    </PortalAuthShell>
  );
};

export default PortalVerifyOtpPage;
