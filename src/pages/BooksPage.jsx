import React from "react";
import PageHero from "@/components/PageHero";
import ShopProductCard from "@/components/ShopProductCard";
import { books } from "@/data/mock";

const BooksPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Books"
        title="Two product lines, one story-first universe."
        description="The Zangi catalogue starts with a core storybook and a companion activity title. Each one is available in digital and hardcopy formats."
        actions={[
          { label: "Go to shop", to: "/shop", variant: "solid" },
          { label: "See activities", to: "/activities", variant: "outline" },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-2">
            {books.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                ctaLabel="View book details"
              />
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] bg-[#fff7ed] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Digital
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-[#7c2d12]">
                Portal-ready access
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Digital orders move into the portal and progress to a
                download-ready state. This is ideal for immediate access,
                printable use, or digital libraries.
              </p>
            </article>

            <article className="rounded-[2rem] bg-black p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                Hardcopy
              </p>
              <h3 className="mt-4 text-3xl font-semibold">
                Physical books with tracked progress
              </h3>
              <p className="mt-4 text-base leading-7 text-white/75">
                Hardcopy orders are captured on-site, then tracked inside the
                portal with milestones such as received, processing, shipped,
                and delivered.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
