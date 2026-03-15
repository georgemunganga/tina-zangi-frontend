import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Compass,
  MapPin,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { events } from "@/data/mock";
import { useCommerce } from "@/providers/CommerceProvider";

const defaultTheme = {
  primary: "rgba(124,45,18,0.84)",
  secondary: "rgba(15,118,110,0.72)",
  accent: "#fde68a",
  surface: "#fff7ed",
};

const formatMode = (value) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <div className="max-w-3xl">
    <p
      className={`text-sm font-semibold uppercase tracking-[0.28em] ${
        light ? "text-white/70" : "text-[#0f766e]"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-4 text-4xl font-semibold sm:text-5xl ${
        light ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h2>
    {description ? (
      <p
        className={`mt-5 text-base leading-8 ${
          light ? "text-white/78" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    ) : null}
  </div>
);

const FactCard = ({ icon: Icon, label, value }) => (
  <article className="rounded-[1.75rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-white">
      <Icon size={18} />
    </div>
    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
      {label}
    </p>
    <p className="mt-3 text-sm leading-6 text-white">{value}</p>
  </article>
);

const ExperienceCard = ({ item }) => (
  <article className="rounded-[2rem] border border-amber-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
      <Sparkles size={20} />
    </div>
    <h3 className="mt-5 text-2xl font-semibold text-[#7c2d12]">{item.title}</h3>
    <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
  </article>
);

const EventDetailPage = () => {
  const { slug } = useParams();
  const { formatFromUsd, pricingNotice } = useCommerce();
  const event = useMemo(() => events.find((item) => item.slug === slug), [slug]);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const isSoldOut = event.status === "sold-out";
  const theme = { ...defaultTheme, ...(event.heroTheme || {}) };
  const factItems = [
    { label: "Date", value: event.dateLabel, icon: CalendarDays },
    { label: "Time", value: event.timeLabel, icon: Clock3 },
    { label: "Location", value: event.locationLabel, icon: MapPin },
    {
      label: "Audience",
      value: event.audienceLabel || event.audience,
      icon: Users,
    },
    { label: "Format", value: formatMode(event.mode), icon: Compass },
  ];

  const heroStyle = {
    backgroundImage: `
      linear-gradient(115deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.46) 42%, rgba(15,23,42,0.88) 100%),
      radial-gradient(circle at top left, ${theme.primary} 0%, transparent 38%),
      radial-gradient(circle at bottom right, ${theme.secondary} 0%, transparent 42%),
      url(${event.image})
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
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            <span>Back to events</span>
          </Link>

          <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  {formatMode(event.mode)}
                </span>
                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                    isSoldOut
                      ? "bg-rose-100 text-rose-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {isSoldOut ? "Sold out" : "Tickets available"}
                </span>
              </div>

              <h1
                className="mt-8 max-w-4xl text-5xl font-bold leading-none sm:text-6xl xl:text-[5.4rem]"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                {event.title}
              </h1>

              <p className="mt-6 max-w-3xl text-xl leading-8 text-white/90">
                {event.subtitle}
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
                {event.excerpt}
              </p>

              <div className="mt-8 max-w-3xl rounded-[2rem] border border-white/12 bg-black/20 p-6 backdrop-blur-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                  About this experience
                </p>
                <p className="mt-4 text-base leading-8 text-white/82">
                  {event.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {event.whoItsFor.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-medium text-white/82 backdrop-blur"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="xl:pt-4">
              <div className="rounded-[2.25rem] border border-white/15 bg-white/12 p-7 backdrop-blur-2xl shadow-[0_30px_100px_rgba(15,23,42,0.28)]">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: theme.accent, color: "#7c2d12" }}
                  >
                    <Ticket size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                      Digital event ticket
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {event.standardTicket.label}
                    </p>
                  </div>
                </div>

                <p className="mt-7 text-5xl font-semibold text-white">
                  {formatFromUsd(event.standardTicket.price)}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  {event.standardTicket.delivery}
                </p>
                <p className="mt-4 text-sm text-white/65">{pricingNotice}</p>

                <div className="mt-6 rounded-[1.5rem] bg-black/20 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                    Availability
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/82">
                    {event.availabilityNote}
                  </p>
                </div>

                {isSoldOut ? (
                  <div className="mt-6 rounded-[1.5rem] bg-white/12 px-5 py-4 text-sm font-medium text-white/82">
                    This event is sold out. Keep the page as a reference and watch
                    the events list for the next release.
                  </div>
                ) : (
                  <div className="mt-7">
                    <Link
                      to={`/events/${event.slug}/checkout`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <span>{event.ctaLabel || "Reserve digital tickets"}</span>
                      <ArrowRight size={16} />
                    </Link>
                    <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-white/50">
                      One simple checkout page. Digital delivery only.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {factItems.map((item) => (
              <FactCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff8f1] py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-[2.25rem] border border-amber-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
            <SectionHeading
              eyebrow="About the Event"
              title="A premium family event built around story, atmosphere, and shared reflection."
              description="This page is designed to feel like a real event invitation, not a product listing. The experience is live, warm, and intentionally paced so parents and children can enjoy it together."
            />

            <div className="mt-8 space-y-5">
              {event.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <CheckCircle2 className="mt-1 text-[#ea580c]" size={18} />
                  <p className="text-base leading-7 text-slate-600">{highlight}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.25rem] bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-10">
            <SectionHeading
              eyebrow="Who It's For"
              title="Designed for parents, children, and education-minded communities."
              description={event.audience}
              light
            />

            <div className="mt-8 space-y-4">
              {event.whoItsFor.map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-white/5 p-4">
                  <p className="text-sm leading-7 text-white/82">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <SectionHeading
            eyebrow="What Families Can Expect"
            title="An event that feels playful, premium, and genuinely worth attending."
            description="The design direction is closer to a real conference or live experience page than a store listing, while still keeping the tone right for children and parents."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {event.familyExperience.map((item) => (
              <ExperienceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf5] py-20 sm:py-28">
        <div className="site-shell grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2.25rem] border border-amber-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
            <SectionHeading
              eyebrow="Event Flow"
              title="A clear, welcoming rhythm from arrival to close."
              description="This section gives the page the feeling of a real event agenda without overcomplicating the experience."
            />

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
          </article>

          <article className="rounded-[2.25rem] bg-[linear-gradient(160deg,#7c2d12_0%,#0f766e_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:p-10">
            <SectionHeading
              eyebrow="Venue / Access / Logistics"
              title="Important details before you register."
              description="The goal is to answer the practical questions a real event attendee would have before checking out."
              light
            />

            <div className="mt-8 space-y-4">
              {event.logistics.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] bg-white/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/82">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-black/10 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-white" size={18} />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                    Location reference
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/82">
                    {event.locationLabel}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="site-shell">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,#7c2d12_0%,#c2410c_38%,#0f766e_100%)] p-8 shadow-[0_30px_100px_rgba(15,23,42,0.2)] sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
                  Final call
                </p>
                <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                  Step into the event while tickets are still available.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
                  {event.availabilityNote} Checkout stays simple: one page, digital
                  ticket only, and the pass appears in the portal after purchase.
                </p>
              </div>

              <div className="lg:justify-self-end">
                {isSoldOut ? (
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span>Browse other events</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    to={`/events/${event.slug}/checkout`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <span>{event.ctaLabel || "Reserve digital tickets"}</span>
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
