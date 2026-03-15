import React from "react";
import { Link } from "react-router-dom";
import { Compass, PenSquare, Sparkles } from "lucide-react";
import { activityHighlights } from "@/data/mock";

const iconMap = [Compass, PenSquare, Sparkles];

const ActivitiesHighlights = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="site-shell">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
            Activities
          </p>
          <h2
            className="text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.75rem]"
            style={{ fontFamily: "'ADVENTURES', sans-serif" }}
          >
            Keep the story moving after the last page.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Zangi is not only about reading. The activity side of the world is
            built to help children imagine, create, and respond to what they
            have read in ways that feel joyful and thoughtful.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {activityHighlights.map((item, index) => {
              const Icon = iconMap[index % iconMap.length];

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-amber-100 bg-gradient-to-b from-white to-amber-50/70 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#7c2d12]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <aside className="rounded-[2rem] bg-[linear-gradient(160deg,#134e4a_0%,#0f766e_55%,#14b8a6_100%)] p-8 text-white shadow-[0_24px_70px_rgba(15,118,110,0.28)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              For home and classroom
            </p>
            <h3
              className="mt-4 text-4xl font-bold leading-none sm:text-5xl"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Activity-led learning that still feels magical.
            </h3>
            <p className="mt-6 text-base leading-7 text-white/80">
              Explore the activity book, creative prompts, and guided exercises
              built to support reading development without flattening the sense
              of wonder.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/activities"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition-transform duration-300 hover:-translate-y-0.5"
              >
                View activities
              </Link>
              <Link
                to="/shop/zangi-adventure-activity-book"
                className="rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                See the activity book
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesHighlights;
