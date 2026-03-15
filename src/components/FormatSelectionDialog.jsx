import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, TabletSmartphone } from "lucide-react";
import { useCommerce } from "@/providers/CommerceProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const iconMap = {
  digital: TabletSmartphone,
  hardcopy: Package,
};

const FormatSelectionDialog = ({ product, open, onOpenChange }) => {
  const navigate = useNavigate();
  const { formatFromUsd, pricingNotice } = useCommerce();
  const [selectedFormat, setSelectedFormat] = useState(product.defaultFormat);

  useEffect(() => {
    if (open) {
      setSelectedFormat(product.defaultFormat);
    }
  }, [open, product.defaultFormat]);

  const selectedItem =
    product.formats.find((format) => format.type === selectedFormat) ||
    product.formats[0];

  const handleContinue = () => {
    navigate(`/checkout/${product.slug}?format=${selectedItem.type}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-[2rem] border-0 bg-[#fffaf5] p-0 shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
        <div className="rounded-[2rem] bg-[linear-gradient(145deg,#fff7ed_0%,#fffaf5_100%)] p-8 sm:p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-[#7c2d12] sm:text-4xl">
              Choose your format
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Before checkout, tell us whether you want the digital or hardcopy
              version of {product.title}. Each format has its own price and
              fulfillment experience.
            </DialogDescription>
            <p className="mt-4 text-sm font-medium text-[#9a3412]">
              {pricingNotice}
            </p>
          </DialogHeader>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {product.formats.map((format) => {
              const Icon = iconMap[format.type] || Package;
              const isActive = format.type === selectedFormat;

              return (
                <button
                  key={format.type}
                  type="button"
                  onClick={() => setSelectedFormat(format.type)}
                  className={`rounded-[1.5rem] border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#ea580c] bg-white shadow-[0_18px_50px_rgba(234,88,12,0.14)]"
                      : "border-amber-100 bg-white/80 hover:border-[#fdba74]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                      <Icon size={22} />
                    </div>
                    {isActive ? (
                      <CheckCircle2 className="text-[#ea580c]" size={20} />
                    ) : null}
                  </div>
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                      {format.label}
                    </p>
                    <h4 className="mt-3 text-3xl font-semibold text-[#7c2d12]">
                      {formatFromUsd(format.price)}
                    </h4>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {format.description}
                    </p>
                    <p className="mt-4 rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm font-medium text-[#9a3412]">
                      {format.fulfillment}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <DialogFooter className="mt-8 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Selected:{" "}
              <span className="font-semibold text-slate-700">
                {selectedItem.label}
              </span>
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-slate-300 px-6"
                onClick={() => onOpenChange(false)}
              >
                Not now
              </Button>
              <Button
                type="button"
                className="rounded-full bg-[#c2410c] px-6 text-white hover:bg-[#9a3412]"
                onClick={handleContinue}
              >
                Continue to checkout
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormatSelectionDialog;
