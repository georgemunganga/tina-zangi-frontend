import React from "react";
import { MapPin } from "lucide-react";
import { storyWorld } from "@/data/mock";

const StoryWorld = () => {
  return (
    <section className="bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] py-20 sm:py-28">
      <div className="site-shell">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 text-[#0f766e]">
            <MapPin size={18} />
            <p className="text-sm font-semibold uppercase tracking-[0.16em]">
              Story world
            </p>
          </div>
          <h2
            className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.7rem]"
            style={{ fontFamily: "'ADVENTURES', sans-serif" }}
          >
            {storyWorld.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            {storyWorld.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {storyWorld.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-amber-100 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {storyWorld.locations.map((location) => (
            <article
              key={location.name}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.22)_44%,rgba(15,23,42,0.86)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/72">
                    Zangi world
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight">
                    {location.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-base leading-7 text-slate-600">
                  {location.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryWorld;
