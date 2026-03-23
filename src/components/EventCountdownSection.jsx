import React, { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, Radio } from "lucide-react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const buildCountdownParts = (remainingMs) => {
  const clampedMs = Math.max(0, remainingMs);
  const totalSeconds = Math.floor(clampedMs / SECOND);
  const days = Math.floor(totalSeconds / (DAY / SECOND));
  const hours = Math.floor((totalSeconds % (DAY / SECOND)) / (HOUR / SECOND));
  const mins = Math.floor((totalSeconds % (HOUR / SECOND)) / (MINUTE / SECOND));
  const sec = totalSeconds % (MINUTE / SECOND);

  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Mins", value: String(mins).padStart(2, "0") },
    { label: "Sec", value: String(sec).padStart(2, "0") },
  ];
};

const EventCountdownSection = ({
  startsAt,
  countdownStartsAt,
  liveWindowHours = 5,
  dateLabel,
  timeLabel,
  locationLabel,
}) => {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const startMs = useMemo(() => Date.parse(startsAt), [startsAt]);
  const countdownStartMs = useMemo(
    () => Date.parse(countdownStartsAt || startsAt),
    [countdownStartsAt, startsAt],
  );
  const liveWindowMs = liveWindowHours * HOUR;

  useEffect(() => {
    if (!Number.isFinite(startMs)) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setNowMs(Date.now());
    }, SECOND);

    return () => window.clearInterval(timerId);
  }, [startMs]);

  if (!Number.isFinite(startMs)) {
    return null;
  }

  if (Number.isFinite(countdownStartMs) && nowMs < countdownStartMs) {
    return null;
  }

  const liveEndsAtMs = startMs + liveWindowMs;
  const isBeforeStart = nowMs < startMs;
  const isLive = nowMs >= startMs && nowMs < liveEndsAtMs;
  const countdownParts = buildCountdownParts(startMs - nowMs);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-shell">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
         
            <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12] sm:text-5xl">
              {isBeforeStart
                ? "Register before countdown"
                : isLive
                  ? "The launch is live now"
                  : "This event has already taken place"}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {isBeforeStart
                ? `${dateLabel} at ${timeLabel}`
                : isLive
                  ? `The launch is currently happening at ${locationLabel}.`
                  : "The live launch window has ended."}
            </p>
          </div>

          {isBeforeStart ? (
            <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4">
              {countdownParts.map((part) => (
                <article
                  key={part.label}
                  className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-[#fffaf5] px-2 py-4 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:rounded-[2rem] sm:px-4 sm:py-5 lg:px-6 lg:py-6"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 sm:text-xs">
                    {part.label}
                  </p>
                  <p className="mt-3 text-[clamp(2rem,7.2vw,4.75rem)] font-semibold leading-none text-[#7c2d12]">
                    {part.value}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <article
              className={`mx-auto mt-8 max-w-3xl rounded-[2.25rem] px-7 py-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)] ${
                isLive
                  ? "border border-emerald-200 bg-[linear-gradient(160deg,#ecfdf5_0%,#f0fdf4_100%)]"
                  : "border border-slate-200 bg-[linear-gradient(160deg,#fff7ed_0%,#ffffff_100%)]"
              }`}
            >
              <div
                className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] ${
                  isLive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-[#fff7ed] text-[#c2410c]"
                }`}
              >
                {isLive ? <Radio size={24} /> : <CheckCircle2 size={24} />}
              </div>
              <p className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
                {isLive ? "Event is live now" : "Event completed"}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {isLive
                  ? `Head to ${locationLabel}. Tickets and event details are already on this page.`
                  : "This launch has already taken place."}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                <CalendarClock size={16} />
                <span>
                  {dateLabel} | {timeLabel}
                </span>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventCountdownSection;
