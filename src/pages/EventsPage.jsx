import React from "react";
import EventCard from "@/components/EventCard";
import PageHero from "@/components/PageHero";
import { events } from "@/data/mock";

const EventsPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Step into the Zangi world live."
        description="Discover upcoming Zangi events, choose a single-date experience, and purchase a digital ticket pass before checkout."
        actions={[
          { label: "Browse upcoming events", to: "/events#events", variant: "solid" },
          { label: "Open the portal", to: "/portal/login", variant: "outline" },
        ]}
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm text-white/85 backdrop-blur">
          <span className="rounded-full bg-white/15 px-3 py-1">Single-date events</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Digital ticketing</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Portal-ready passes</span>
        </div>
      </PageHero>

      <section id="events" className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Upcoming experiences
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12] sm:text-5xl">
              Events designed for story, culture, and real-world connection.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Each event has its own dedicated page, schedule details, and a
              digital-only ticket checkout flow. Purchase history and passes stay
              connected to the portal.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
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
