import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import MeetZangi from "@/components/MeetZangi";
import StoryWorld from "@/components/StoryWorld";
import { storyWorld } from "@/data/mock";

const StoryPage = () => {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="The story"
        title="A story world built for courage, warmth, and wonder."
        description="Zangi is more than a character. It is a story world designed to feel emotionally rich, visually memorable, and rooted in values children can carry into everyday life."
        actions={[
          { label: "Shop the books", to: "/shop", variant: "solid" },
          { label: "Visit the parents page", to: "/parents", variant: "outline" },
        ]}
      />

      <MeetZangi />

      <section className="bg-[#fffaf5] py-20 sm:py-28">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Story pillars
            </p>
            <h2
              className="mt-4 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              What the Zangi story is trying to leave behind.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {storyWorld.themes.map((theme, index) => (
              <article
                key={theme}
                className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
                  Theme {index + 1}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-[#7c2d12]">
                  {theme}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  These themes shape the emotional experience of the books and
                  the way children talk about the story after reading.
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-[#7c2d12] p-8 text-white shadow-[0_24px_70px_rgba(124,45,18,0.24)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
              From page to purchase
            </p>
            <h3
              className="mt-4 text-4xl font-bold leading-none sm:text-5xl"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Explore the world, then choose the format that fits.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              Every book in the shop lets readers decide between digital and
              hardcopy before checkout, so the purchase flow stays clear and
              intentional.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#7c2d12] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span>Enter the shop</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <StoryWorld />
    </div>
  );
};

export default StoryPage;
