import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket, CheckCircle2
} from "lucide-react";
import EventCountdownSection from "@/components/EventCountdownSection";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { events } from "@/data/mock";
import { useCommerce } from "@/providers/CommerceProvider";

const defaultTheme = {
  primary: "rgba(124,45,18,0.84)",
  secondary: "rgba(15,118,110,0.72)",
  accent: "#fde68a",
};

const formatMode = (value) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const FactCard = ({ icon: Icon, value }) => (
  <article className="rounded-[1.75rem] border border-white/12 bg-white/10 p-2 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
    <div className="flex h-full items-center gap-1">
      <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[1.25rem] bg-white/12 text-white">
        <Icon size={24} />
      </div>
      <p className="text-sm leading-6 text-white sm:text-base">{value}</p>
    </div>
  </article>
);

const EventTicketPanel = ({
  event,
  isSoldOut,
  selectedTicket,
  selectedTicketId,
  setSelectedTicketId,
  ticketOptions,
  theme,
  formatFromUsd,
  quotedCurrencyCode,
  className = "",
}) => {
  const checkoutSearch = new URLSearchParams({
    ticket: selectedTicket.id,
    currency: quotedCurrencyCode,
  }).toString();

  return (
    <div
      className={`rounded-[2.25rem] border border-white/15 bg-white/12 p-7 backdrop-blur-2xl shadow-[0_30px_100px_rgba(15,23,42,0.28)] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: theme.accent, color: "#7c2d12" }}
        >
          <Ticket size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
            Online Tickets
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {selectedTicket.label}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {ticketOptions.map((ticket) => {
          const isActive = ticket.id === selectedTicketId;

          return (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicketId(ticket.id)}
              className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-white bg-white text-slate-900 shadow-[0_18px_50px_rgba(255,255,255,0.2)]"
                  : "border-dashed border-white/80 bg-white/12 text-white hover:border-white hover:bg-white/12"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  isActive ? "text-[#0f766e]" : "text-white/65"
                }`}
              >
                {ticket.label}
              </p>
              <p
                className={`mt-2 text-lg font-semibold ${
                  isActive ? "text-slate-900" : "text-white"
                }`}
              >
                {formatFromUsd(ticket.price)}
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-7 text-5xl font-semibold text-white">
        {formatFromUsd(selectedTicket.price)}
      </p>
      <p className="mt-4 text-sm leading-7 text-white/75">
        {selectedTicket.delivery}
      </p>

      {isSoldOut ? (
        <div className="mt-6 rounded-[1.5rem] bg-white/12 px-5 py-4 text-sm font-medium text-white/82">
          This launch is sold out. Check back on the events page for the next
          release.
        </div>
      ) : (
        <div className="mt-7">
          <Button asChild variant="brandSecondary" size="pillLg" className="w-full">
            <Link to={`/events/${event.slug}/checkout?${checkoutSearch}`}>
              <span>{event.ctaLabel || "Reserve digital tickets"}</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.12em] text-white/50">
            Digital pass only
          </p>
        </div>
      )}
    </div>
  );
};

const EventDetailPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { formatFromUsd, siteCurrencyCode } = useCommerce();
  const event = useMemo(() => events.find((item) => item.slug === slug), [slug]);
  const ticketOptions = useMemo(
    () =>
      event?.ticketTypes?.length
        ? event.ticketTypes
        : [
            {
              id: event?.defaultTicketType || "standard",
              ...(event?.standardTicket || {}),
            },
          ],
    [event],
  );
  const [selectedTicketId, setSelectedTicketId] = useState("standard");
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  useEffect(() => {
    if (!event) {
      return;
    }

    setSelectedTicketId(
      searchParams.get("ticket") || event.defaultTicketType || ticketOptions[0]?.id || "standard",
    );
  }, [event, searchParams, ticketOptions]);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const isSoldOut = event.status === "sold-out";
  const theme = { ...defaultTheme, ...(event.heroTheme || {}) };
  const selectedTicket =
    ticketOptions.find((item) => item.id === selectedTicketId) || ticketOptions[0];
  const factItems = [
    { label: "Date", value: event.dateLabel, icon: CalendarDays },
    { label: "Time", value: event.timeLabel, icon: Clock3 },
    { label: "Venue", value: event.locationLabel, icon: MapPin },
  ];

  const heroStyle = {
    backgroundImage: `
      linear-gradient(115deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.46) 42%, rgba(15,23,42,0.88) 100%),
      radial-gradient(circle at top left, ${theme.primary} 0%, transparent 38%),
      radial-gradient(circle at bottom right, ${theme.secondary} 0%, transparent 42%),
      url("${event.image}")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" style={heroStyle} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14)_0%,transparent_28%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.12)_0%,transparent_30%)]" />

        <div className="site-shell relative pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Button asChild variant="brandGhost" size="pillSm">
            <Link to="/events">
              <ArrowLeft size={16} />
              <span>Back to events</span>
            </Link>
          </Button>

          <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                  {formatMode(event.mode)}
                </span>
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                    isSoldOut
                      ? "bg-rose-100 text-rose-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {isSoldOut ? "Sold out" : "Tickets available"}
                </span>
              </div>

              <div className="mt-8 pb-4 flex items-start">
                {event.teaserImage ? (
                  <img
                    src={event.teaserImage}
                    alt={`${event.title} teaser art`}
                    className="h-[13.25rem] relative right-[4rem] lg:right-[6rem] w-auto flex-shrink-0 sm:h-[16.5rem] sm:max-w-none lg:h-[17.75rem]"
                    loading="eager"
                    decoding="async"
                  />
                ) : null}
                <img
                  src="/images/Save the date  23rd December.svg"
                  alt="Save the date 23rd December"
                  className="h-[12.75rem] relative right-[9rem] lg:right-[14rem] w-auto max-w-[42vw] lg:max-w-[42vw] sm:h-[15.5rem] sm:max-w-none lg:h-[17.25rem]"
                  loading="eager"
                  decoding="async"
                />
                
              </div>

              <h1
                className="mt-8 max-w-4xl text-2xl font-bold leading-none sm:text-6xl xl:text-[2.4rem]"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                {event.title}
              </h1>

              <p className="mt-6 max-w-3xl text-xl leading-8 text-white/90">
                {event.subtitle}
              </p>

              <div className="mt-8 grid max-w-4xl gap-4 lg:grid-cols-3">
                {factItems.map((item) => (
                  <FactCard
                    key={item.label}
                    icon={item.icon}
                    value={item.value}
                  />
                ))}
              </div>

              {!isSoldOut ? (
                <Button
                  type="button"
                  variant="brandGhost"
                  size="pill"
                  className="mt-8 uppercase tracking-[0.08em]"
                  onClick={() => setTicketModalOpen(true)}
                >
                  Get your ticket
                </Button>
              ) : null}

              

              {/* <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-white/82 backdrop-blur">
                  Families welcome
                </span>
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-white/82 backdrop-blur">
                  Lusaka launch
                </span>
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-white/82 backdrop-blur">
                  Schools and community guests
                </span>
              </div> */}
            </div>

            <aside className="xl:pt-4">
              <EventTicketPanel
                event={event}
                isSoldOut={isSoldOut}
                selectedTicket={selectedTicket}
                selectedTicketId={selectedTicketId}
                setSelectedTicketId={setSelectedTicketId}
                ticketOptions={ticketOptions}
                theme={theme}
                formatFromUsd={formatFromUsd}
                quotedCurrencyCode={siteCurrencyCode}
              />
            </aside>
          </div>

        </div>
      </section>

      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="max-w-2xl border-0 bg-transparent p-0 shadow-none sm:rounded-[2.25rem]">
          <DialogTitle className="sr-only">Get your ticket</DialogTitle>
          <EventTicketPanel
            event={event}
            isSoldOut={isSoldOut}
            selectedTicket={selectedTicket}
            selectedTicketId={selectedTicketId}
            setSelectedTicketId={setSelectedTicketId}
            ticketOptions={ticketOptions}
            theme={theme}
            formatFromUsd={formatFromUsd}
            quotedCurrencyCode={siteCurrencyCode}
            className="bg-[linear-gradient(140deg,rgba(124,45,18,0.96)_0%,rgba(15,23,42,0.96)_100%)]"
          />
        </DialogContent>
      </Dialog>

      <EventCountdownSection
        startsAt={event.startsAt}
        liveWindowHours={event.liveWindowHours}
        dateLabel={event.dateLabel}
        timeLabel={event.timeLabel}
        locationLabel={event.locationLabel}
      />

      <section className="bg-[#fff8f1] py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[2.25rem] border border-amber-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Event overview
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              What to expect at the launch
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {event.description}
            </p>
            {!isSoldOut ? (
              <Button
                type="button"
                variant="brand"
                size="pill"
                className="mt-8"
                onClick={() => setTicketModalOpen(true)}
              >
                Get your ticket
              </Button>
            ) : null}
          </article>

          <article className="rounded-[2.25rem] bg-black p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Highlights
            </p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              The key moments on the day
            </h2>

            <div className="mt-8 space-y-5">
              {event.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <CheckCircle2 className="mt-1 text-[#5eead4]" size={18} />
                  <p className="text-base leading-7 text-white/82">{highlight}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Event flow
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              What happens on the day
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Arrive early, settle in, enjoy the launch program, and stay for the
              closing connection time.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {event.scheduleItems.map((item, index) => (
              <div
                key={item.label}
                className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[72px_minmax(0,1fr)] sm:items-start"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c2d12] text-sm font-semibold text-white sm:h-14 sm:w-14">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">{item.label}</p>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf5] py-20 sm:py-28">
        <div className="site-shell grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2.25rem] bg-[linear-gradient(160deg,#7c2d12_0%,#0f766e_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Venue and access
            </p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Where the launch happens
            </h2>
            <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-black/10 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-white" size={18} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                    Venue
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/82">
                    {event.locationLabel}
                  </p>
                </div>
              </div>
              
            </div>
            {!isSoldOut ? (
              <Button
                type="button"
                variant="brandSecondary"
                size="pill"
                className="mt-8"
                onClick={() => setTicketModalOpen(true)}
              >
                Get your ticket
              </Button>
            ) : null}
          </article>

          <article className="rounded-[2.25rem] border border-amber-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Before you go
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Practical details
            </h2>

            <div className="mt-8 space-y-4">
              {event.logistics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.value}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
