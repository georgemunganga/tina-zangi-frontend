import React from "react";
import EventCard from "@/components/EventCard";
import PageHero from "@/components/PageHero";
import { events } from "@/data/mock";

const EventsPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Live Zangi events."
        description="Discover upcoming Zangi launches and family story experiences."
        backgroundImage="/images/events bg.png"
        backgroundImagePosition="72% center"
      />

      <section id="events" className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Events list
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12] sm:text-5xl">
              Browse upcoming events
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Tap any event card to see the full details and ticket options.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
