import React from "react";
import { Link } from "react-router-dom";
import { Compass, PenSquare, Sparkles } from "lucide-react";
import { activityHighlights } from "@/data/mock";
import { Button } from "@/components/ui/button";

const iconMap = [Compass, PenSquare, Sparkles];

const ActivitiesHighlights = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="site-shell">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Activities
          </p>
          <h2
            className="text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.4rem]"
            style={{ fontFamily: "'ADVENTURES', sans-serif" }}
          >
            Keep the story moving after the last page.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Story prompts, creative exercises, and guided activities help
            children stay inside the Zangi world a little longer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6 md:grid-cols-3">
            {activityHighlights.map((item, index) => {
              const Icon = iconMap[index % iconMap.length];

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
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

          <aside className="rounded-[2rem] border border-slate-200 bg-[#134e4a] p-8 text-white shadow-[0_24px_70px_rgba(15,118,110,0.22)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/68">
              For home and classroom
            </p>
            <h3
              className="mt-4 text-4xl font-bold leading-none sm:text-5xl"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Activity-led learning that still feels magical.
            </h3>
            <p className="mt-6 text-base leading-7 text-white/78">
              The activity side of Zangi keeps reading active, creative, and
              useful for families, educators, and group settings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brandSecondary" size="pill">
                <Link to="/activities">View activities</Link>
              </Button>
              <Button asChild variant="brandGhost" size="pill">
                <Link to="/shop/zangi-adventure-activity-book">
                  See the activity book
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesHighlights;
