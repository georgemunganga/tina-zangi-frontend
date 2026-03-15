import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookMarked } from "lucide-react";
import { useCommerce } from "@/providers/CommerceProvider";

const ShopProductCard = ({ product, ctaLabel = "View details" }) => {
  const { formatFromUsd } = useCommerce();
  const prices = product.formats.map((format) => format.price);
  const minPrice = Math.min(...prices);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7c2d12]">
          {product.type}
        </div>
        <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
          <BookMarked size={14} />
          <span>{product.ageRange}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-2">
          {product.formats.map((format) => (
            <span
              key={format.type}
              className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a3412]"
            >
              {format.label}
            </span>
          ))}
        </div>

        <h3 className="mt-5 text-3xl font-semibold text-[#7c2d12]">
          {product.title}
        </h3>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-[#0f766e]">
          {product.category}
        </p>
        <p className="mt-5 text-base leading-7 text-slate-600">
          {product.description}
        </p>

        <ul className="mt-6 space-y-3">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#f97316]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">From</p>
            <p className="text-3xl font-semibold text-[#7c2d12]">
              {formatFromUsd(minPrice)}
            </p>
          </div>
          <Link
            to={`/shop/${product.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#c2410c] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span>{ctaLabel}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
