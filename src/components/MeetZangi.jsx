import React from "react";
import {
  Compass,
  Heart,
  Lightbulb,
  MapPin,
  Sparkles,
} from "lucide-react";
import { zangiCharacter } from "@/data/mock";

const iconMap = {
  Courageous: Compass,
  Curious: Lightbulb,
  "Kind-hearted": Heart,
  Resourceful: Sparkles,
};

const factItems = [
  {
    label: "Age",
    value: zangiCharacter.age,
    icon: Sparkles,
  },
  {
    label: "Homeland",
    value: zangiCharacter.homeland,
    icon: MapPin,
  },
];

const MeetZangi = () => {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fffaf5_100%)] py-20 sm:py-28">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Meet Zangi
            </p>
            <h2
              className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.6rem]"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              A young explorer readers can grow with.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              {zangiCharacter.description}
            </p>

            <div className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                Core line
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-[#7c2d12]">
                "{zangiCharacter.tagline}"
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {factItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                      <Icon size={20} />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-base leading-7 text-slate-700">
                      {item.value}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {zangiCharacter.traits.map((trait) => {
              const Icon = iconMap[trait.name] || Sparkles;

              return (
                <article
                  key={trait.name}
                  className="rounded-[1.9rem] border border-slate-200 bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[#7c2d12]">
                    {trait.name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {trait.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetZangi;
