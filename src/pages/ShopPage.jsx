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
      
      </PageHero>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
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
