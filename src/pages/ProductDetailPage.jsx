import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Package,
  TabletSmartphone,
} from "lucide-react";
import { books } from "@/data/mock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCommerce } from "@/providers/CommerceProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const iconMap = {
  digital: TabletSmartphone,
  hardcopy: Package,
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { formatFromUsd, pricingNotice, siteCurrencyCode } = useCommerce();

  const product = useMemo(
    () => books.find((item) => item.slug === slug),
    [slug],
  );
  const [selectedFormatType, setSelectedFormatType] = useState("digital");
  const [quantityDialogOpen, setQuantityDialogOpen] = useState(false);
  const [hardcopyQuantity, setHardcopyQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      return;
    }

    setSelectedFormatType(product.defaultFormat || product.formats[0]?.type || "digital");
  }, [product]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const selectedFormat =
    product.formats.find((format) => format.type === selectedFormatType) ||
    product.formats[0];
  const hardcopyFormat =
    product.formats.find((format) => format.type === "hardcopy") ||
    product.formats[0];
  const hardcopyTotal = Number((hardcopyFormat.price * hardcopyQuantity).toFixed(2));

  const handleCheckout = () => {
    if (selectedFormat.type === "hardcopy") {
      setQuantityDialogOpen(true);
      return;
    }

    navigate(
      `/checkout/${product.slug}?format=${selectedFormat.type}&currency=${siteCurrencyCode}`,
    );
  };

  const handleHardcopyContinue = () => {
    navigate(
      `/checkout/${product.slug}?format=hardcopy&quantity=${Math.max(
        1,
        hardcopyQuantity,
      )}&currency=${siteCurrencyCode}`,
    );
    setQuantityDialogOpen(false);
  };

  return (
    <div>
      <section className="bg-[linear-gradient(150deg,#fff7ed_0%,#ffffff_55%,#fffaf5_100%)] py-28 sm:py-32">
        <div className="site-shell">
          <Button asChild variant="brandSoft" size="pillSm">
            <Link to="/shop">
              <ArrowLeft size={16} />
              <span>Back to shop</span>
            </Link>
          </Button>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="flex min-h-[520px] items-end justify-center rounded-[2rem] border border-slate-200 bg-white p-8">
              <img
                src={product.gallery[0]}
                alt={product.title}
                className="max-h-[520px] w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#9a3412]">
                  {product.type}
                </span>
                <span className="rounded-full bg-[#ecfeff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#0f766e]">
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
                {product.description}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Best for {product.audience}.
              </p>
             

              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                  Choose your format
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {product.formats.map((format) => (
                  <button
                    key={format.type}
                    type="button"
                    onClick={() => setSelectedFormatType(format.type)}
                    className={`rounded-[1.5rem] border-2 p-5 text-left transition-all duration-300 ${
                      selectedFormat.type === format.type
                        ? "border-[#ea580c] bg-[#ea580c] shadow-[0_18px_50px_rgba(234,88,12,0.12)]"
                        : "border-slate-700 ring-1 ring-slate-300 bg-white hover:border-[#fdba74]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                          {React.createElement(iconMap[format.type] || Package, { size: 20 })}
                        </div>
                        <p
                          className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                            selectedFormat.type === format.type
                              ? "text-white"
                              : "text-[#0f766e]"
                          }`}
                        >
                          {format.label}
                        </p>
                      </div>
                      {selectedFormat.type === format.type ? (
                        <CheckCircle2 className="text-white" size={20} />
                      ) : null}
                    </div>
                    <h2
                      className={`mt-5 text-2xl font-semibold sm:text-3xl ${
                        selectedFormat.type === format.type
                          ? "text-white"
                          : "text-[#7c2d12]"
                      }`}
                    >
                      {formatFromUsd(format.price)}
                    </h2>
                   
                    <p
                      className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ${
                        selectedFormat.type === format.type
                          ? "bg-white/14 text-white"
                          : "bg-[#fff7ed] text-[#9a3412]"
                      }`}
                    >
                      {format.fulfillment}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <Button
                  type="button"
                  variant="brand"
                  size="pillLg"
                  onClick={handleCheckout}
                >
                  <span>
                    {selectedFormat.type === "hardcopy"
                      ? "Choose hardcopy quantity"
                      : "Continue with digital"}
                  </span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 sm:pb-28">
        <div className="site-shell max-w-5xl">
          <Accordion type="single" collapsible>
            <AccordionItem
              value="more-details"
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >
              <AccordionTrigger className="py-6 text-lg font-semibold text-slate-900 hover:no-underline">
                More details
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                      Why it works
                    </p>
                    <div className="mt-5 space-y-4">
                      {product.benefits.map((benefit) => (
                        <div key={benefit} className="flex gap-3">
                          <CheckCircle2 className="mt-1 text-[#ea580c]" size={18} />
                          <p className="text-base leading-7 text-slate-600">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                      Included
                    </p>
                    <div className="mt-5 space-y-3">
                      {product.features.map((feature) => (
                        <div
                          key={feature}
                          className="rounded-[1.5rem] bg-[#fffaf5] px-4 py-4"
                        >
                          <p className="text-sm leading-7 text-slate-600">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm font-medium text-slate-500">
                      {product.spotlight}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Dialog open={quantityDialogOpen} onOpenChange={setQuantityDialogOpen}>
        <DialogContent className="max-w-xl rounded-[2rem] border-0 bg-[#fffaf5] p-0 shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
          <div className="rounded-[2rem] bg-[linear-gradient(145deg,#fff7ed_0%,#fffaf5_100%)] p-8 sm:p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold text-[#7c2d12] sm:text-4xl">
                Choose hardcopy quantity
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                Tell us how many printed copies you want before continuing to checkout.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                    Hardcopy
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#7c2d12]">
                    {formatFromUsd(hardcopyFormat.price)}
                  </p>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                  <Package size={22} />
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                <Label htmlFor="hardcopy-quantity">Quantity</Label>
                <Input
                  id="hardcopy-quantity"
                  type="number"
                  min="1"
                  className="h-12 rounded-2xl bg-white"
                  value={hardcopyQuantity}
                  onChange={(event) =>
                    setHardcopyQuantity(Math.max(1, Number(event.target.value) || 1))
                  }
                />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-[#fff7ed] p-5">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                  <span>Calculation</span>
                  <span>
                    {formatFromUsd(hardcopyFormat.price)} x {hardcopyQuantity}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 border-t border-amber-100 pt-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                    Total
                  </span>
                  <span className="text-2xl font-semibold text-[#7c2d12]">
                    {formatFromUsd(hardcopyTotal)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-8 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="brandSecondary"
                size="pill"
                onClick={() => setQuantityDialogOpen(false)}
              >
                Not now
              </Button>
              <Button
                type="button"
                variant="brand"
                size="pill"
                onClick={handleHardcopyContinue}
              >
                Continue to checkout
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailPage;
