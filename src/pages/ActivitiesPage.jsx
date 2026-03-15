import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { activityHighlights } from "@/data/mock";

const ActivitiesPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Activities"
        title="Learning that keeps the magic of the story alive."
        description="The Zangi activity experience is designed to turn reading into expression, conversation, and repeatable learning rituals for home and classroom."
        actions={[
          { label: "See the activity book", to: "/shop/zangi-adventure-activity-book", variant: "solid" },
          { label: "Explore books", to: "/books", variant: "outline" },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-6 md:grid-cols-3">
            {activityHighlights.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ${
                  index === 1
                    ? "bg-slate-950 text-white"
                    : "border border-amber-100 bg-white"
                }`}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                    index === 1 ? "text-[#5eead4]" : "text-[#0f766e]"
                  }`}
                >
                  Activity focus
                </p>
                <h3
                  className={`mt-4 text-3xl font-semibold ${
                    index === 1 ? "text-white" : "text-[#7c2d12]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-4 text-base leading-7 ${
                    index === 1 ? "text-white/75" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Built for reuse
            </p>
            <h2
              className="mt-4 text-4xl font-bold leading-none text-[#7c2d12] sm:text-5xl"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Good activity design should outlast the first reading.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
              The activity side of Zangi is not filler. It is designed for
              creative repetition, family prompts, classroom extension, and
              guided reflection after the story itself has landed.
            </p>
            <Link
              to="/shop/zangi-adventure-activity-book"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span>Choose a format for the activity book</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
