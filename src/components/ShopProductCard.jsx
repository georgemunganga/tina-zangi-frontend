import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCommerce } from "@/providers/CommerceProvider";
import { Button } from "@/components/ui/button";

const ShopProductCard = ({ product, ctaLabel = "View details" }) => {
  const { formatFromUsd, getVisibleBookFormats } = useCommerce();
  const visibleFormats = getVisibleBookFormats(product.formats);

  if (!visibleFormats.length) {
    return null;
  }

  const prices = visibleFormats.map((format) => format.price);
  const minPrice = Math.min(...prices);
  const metadata = `${product.type} · ${product.ageRange}`;

  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.08)]">
      <div className="flex h-[320px] items-center justify-center bg-[#f8fafc] p-6">
        <Link to={`/shop/${product.slug}`} className="flex h-full w-full items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      <div className="p-5">
        <p className="text-sm font-medium text-slate-500">{metadata}</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-950">
          {product.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleFormats.map((format) => (
            <span
              key={format.type}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700"
            >
              {format.label}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-200 pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
              Starting from
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {formatFromUsd(minPrice)}
            </p>
          </div>

          <Button asChild variant="brand" size="pillSm">
            <Link to={`/shop/${product.slug}`}>
              <span>{ctaLabel}</span>
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
