import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { books } from "@/data/mock";
import { useCommerce } from "@/providers/CommerceProvider";
import { Button } from "@/components/ui/button";

const HomepageBookCard = ({ product, formatFromUsd, getVisibleBookFormats }) => {
  const visibleFormats = getVisibleBookFormats(product.formats);

  if (!visibleFormats.length) {
    return null;
  }

  const minPrice = Math.min(...visibleFormats.map((format) => format.price));

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
      <div className="grid gap-0 md:grid-cols-[230px_1fr]">
        <div className="flex items-center justify-center bg-[#fffaf5] p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[280px] w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
            {product.type} | {product.ageRange}
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-[#7c2d12]">
            {product.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {product.description}
          </p>
          <p className="mt-4 text-sm font-medium text-slate-500">
            {product.spotlight}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {visibleFormats.map((format) => (
              <span
                key={format.type}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
              >
                {format.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Start here
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {formatFromUsd(minPrice)}
              </p>
            </div>

            <Button asChild variant="brand" size="pillSm">
              <Link to={`/shop/${product.slug}`}>
                <span>See the book</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

const FeaturedBooks = () => {
  const { formatFromUsd, getVisibleBookFormats } = useCommerce();

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fffaf5_100%)] py-20 sm:py-28">
      <div className="site-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-[#0f766e]">
              <Sparkles size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.16em]">
                Featured books
              </p>
            </div>
            <h2
              className="text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl lg:text-[4.6rem]"
              style={{ fontFamily: "'ADVENTURES', sans-serif" }}
            >
              Begin the Zangi reading journey.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Start with the core storybook, then keep the world going with the
              hands-on companion title.
            </p>
          </div>

          <Button asChild variant="brandSoft" size="pill" className="self-start">
            <Link to="/shop">
              <span>Visit the shop</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {books.map((product) => (
            <HomepageBookCard
              key={product.id}
              product={product}
              formatFromUsd={formatFromUsd}
              getVisibleBookFormats={getVisibleBookFormats}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
