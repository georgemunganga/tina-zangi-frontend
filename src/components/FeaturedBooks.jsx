import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { books } from "@/data/mock";
import ShopProductCard from "@/components/ShopProductCard";

const FeaturedBooks = () => {
  return (
    <section className="bg-gradient-to-b from-white to-amber-50/40 py-20 sm:py-28">
      <div className="site-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[#0f766e]">
              <Sparkles size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">
                Featured books
              </p>
            </div>
            <h2
              className="text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.9rem]"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Begin the Zangi reading journey.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Discover the core storybook and the hands-on companion that turns
              reading into activity, reflection, and imagination.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#fdba74] bg-white px-5 py-3 text-sm font-semibold text-[#9a3412] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span>Visit the shop</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {books.map((product) => (
            <ShopProductCard
              key={product.id}
              product={product}
              ctaLabel="Choose a format"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
