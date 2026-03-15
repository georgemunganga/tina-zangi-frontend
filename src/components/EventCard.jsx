import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, MapPin, Ticket } from "lucide-react";
import { useCommerce } from "@/providers/CommerceProvider";

const EventCard = ({ event }) => {
  const { formatFromUsd } = useCommerce();
  const isSoldOut = event.status === "sold-out";

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7c2d12]">
            {event.mode}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
              isSoldOut
                ? "bg-rose-100 text-rose-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isSoldOut ? "Sold out" : "Upcoming"}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
          <Ticket size={14} />
          <span>{event.standardTicket.label}</span>
        </div>
      </div>

      <div className="p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
          {event.dateLabel}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-[#7c2d12]">
          {event.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-slate-600">{event.excerpt}</p>

        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 text-[#f97316]" size={16} />
            <span>{event.dateLabel}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock3 className="mt-0.5 text-[#f97316]" size={16} />
            <span>{event.timeLabel}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 text-[#f97316]" size={16} />
            <span>{event.locationLabel}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Digital ticket</p>
            <p className="text-3xl font-semibold text-[#7c2d12]">
              {formatFromUsd(event.standardTicket.price)}
            </p>
          </div>
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span>View event</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
