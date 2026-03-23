import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const toneStyles = {
  loading: {
    container: "border-slate-200 bg-slate-50 text-slate-800",
    icon: "text-slate-500",
    iconComponent: LoaderCircle,
    spin: true,
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "text-emerald-600",
    iconComponent: CheckCircle2,
    spin: false,
  },
  error: {
    container: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "text-amber-600",
    iconComponent: AlertCircle,
    spin: false,
  },
  network: {
    container: "border-sky-200 bg-sky-50 text-sky-950",
    icon: "text-sky-600",
    iconComponent: WifiOff,
    spin: false,
  },
};

const RequestStatusNotice = ({
  tone = "loading",
  title,
  message,
  hint,
  actionLabel,
  onAction,
  isActionBusy = false,
  className = "",
}) => {
  const style = toneStyles[tone] || toneStyles.loading;
  const Icon = style.iconComponent;

  return (
    <div
      className={`rounded-[1.5rem] border p-4 sm:p-5 ${style.container} ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${style.icon}`}>
          <Icon size={18} className={style.spin ? "animate-spin" : ""} />
        </div>
        <div className="min-w-0 flex-1">
          {title ? <p className="text-sm font-semibold">{title}</p> : null}
          {message ? (
            <p className={`${title ? "mt-1" : ""} text-sm leading-7`}>{message}</p>
          ) : null}
          {hint ? <p className="mt-2 text-sm leading-7 opacity-80">{hint}</p> : null}
          {actionLabel && onAction ? (
            <Button
              type="button"
              variant="brandSecondary"
              size="pillSm"
              className="mt-4"
              onClick={onAction}
              disabled={isActionBusy}
            >
              {actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RequestStatusNotice;
