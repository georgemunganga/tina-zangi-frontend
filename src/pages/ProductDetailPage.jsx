import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { books } from "@/data/mock";
import FormatSelectionDialog from "@/components/FormatSelectionDialog";
import { useCommerce } from "@/providers/CommerceProvider";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { formatFromUsd, pricingNotice } = useCommerce();
  const [dialogOpen, setDialogOpen] = useState(false);

  const product = useMemo(
    () => books.find((item) => item.slug === slug),
    [slug],
  );

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div>
      <section className="bg-[linear-gradient(150deg,#fff7ed_0%,#ffffff_55%,#fffaf5_100%)] py-28 sm:py-32">
        <div className="site-shell">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-[#9a3412] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            <span>Back to shop</span>
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
              <img
                src={product.gallery[0]}
                alt={product.title}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#9a3412]">
                  {product.type}
                </span>
                <span className="rounded-full bg-[#ecfeff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                  {product.ageRange}
                </span>
              </div>

              <h1
                className="mt-6 text-5xl font-bold leading-none text-[#7c2d12] sm:text-6xl"
                style={{ fontFamily: "'ADVENTURES', sans-serif" }}
              >
                {product.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {product.longDescription}
              </p>
              <p className="mt-4 text-sm font-medium text-[#9a3412]">
                {pricingNotice}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {product.formats.map((format) => (
                  <div
                    key={format.type}
                    className="rounded-[1.5rem] border border-amber-100 bg-white p-5"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                      {format.label}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-[#7c2d12]">
                      {formatFromUsd(format.price)}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {format.description}
                    </p>
                    <p className="mt-4 rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm font-medium text-[#9a3412]">
                      {format.fulfillment}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-full bg-[#c2410c] px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                  onClick={() => setDialogOpen(true)}
                >
                  Choose format before checkout
                </button>
                <Link
                  to="/portal/login"
                  className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Preview the portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-amber-100 bg-[#fffaf5] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
              Why this book works
            </p>
            <div className="mt-6 space-y-4">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle2 className="mt-1 text-[#ea580c]" size={18} />
                  <p className="text-base leading-7 text-slate-600">{benefit}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5eead4]">
              Included in this product
            </p>
            <div className="mt-6 space-y-4">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-2xl bg-white/5 p-4">
                  <p className="text-base leading-7 text-white/80">{feature}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/60">{product.spotlight}</p>
          </article>
        </div>
      </section>

      <FormatSelectionDialog
        product={product}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default ProductDetailPage;
