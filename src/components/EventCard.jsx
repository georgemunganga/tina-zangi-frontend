import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => (
  <Link
    to={`/events/${event.slug}`}
    className="group block overflow-hidden rounded-[2rem] bg-slate-950 shadow-[0_24px_70px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1"
  >
    <article className="relative min-h-[27rem] overflow-hidden sm:min-h-[29rem]">
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.2)_42%,rgba(15,23,42,0.92)_100%)]" />

      {event.teaserImage ? (
        <div className="absolute inset-x-0 top-0 flex justify-center px-6 pt-6 sm:px-8 sm:pt-8">
          <img
            src={event.teaserImage}
            alt={`${event.title} teaser art`}
            className="h-[13.5rem] w-auto max-w-full object-contain sm:h-[16rem]"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="text-sm text-white font-semibold   tracking-[0.14em] text-white/72">
          {event.dateLabel} <br /> {event.locationLabel}
        </p>
        <h3
          className="mt-3 text-3xl font-bold leading-none text-white sm:text-[2.35rem]"
          style={{ fontFamily: "'ADVENTURES', sans-serif" }}
        >
          {event.title}
        </h3>
      </div>
    </article>
  </Link>
);

export default EventCard;
