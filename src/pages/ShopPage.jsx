import React from "react";
import PageHero from "@/components/PageHero";
import ShopProductCard from "@/components/ShopProductCard";
import { books } from "@/data/mock";

const ShopPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Shop"
        title="Choose the book. Then choose the format."
        description="Every Zangi product starts here. Browse the collection, open a product, and select digital or hardcopy before continuing to checkout."
      >
        <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm text-white/85 backdrop-blur">
          <span className="rounded-full bg-white/15 px-3 py-1">Digital ready</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Hardcopy tracked</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Portal connected</span>
        </div>
      </PageHero>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-8 lg:grid-cols-2">
            {books.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                ctaLabel="Open product page"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
