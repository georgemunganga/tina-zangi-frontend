import React from "react";
import { CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCommerce } from "@/providers/CommerceProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatCardNumber,
  formatExpiry,
  getMobileProviderOptions,
  getPaymentMethodLabel,
  isCardPaymentMethod,
} from "@/lib/payment";

const iconMap = {
  "mobile-money": Smartphone,
  "atm-card": CreditCard,
  visa: CreditCard,
  mastercard: CreditCard,
};

const PaymentDetailsSection = ({
  paymentMethod,
  setPaymentMethod,
  paymentState,
  setPaymentState,
}) => {
  const { checkoutNotice, paymentOptions } = useCommerce();
  const isCardMethod = isCardPaymentMethod(paymentMethod);
  const selectedMethodLabel = getPaymentMethodLabel(paymentMethod);

  const updateField = (field, value) => {
    setPaymentState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f766e]">
        Payment details
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-slate-900">
        Choose how the customer will pay online
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        {checkoutNotice} Only masked payment metadata is kept in local storage
        after submission.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {paymentOptions.map((method) => {
          const Icon = iconMap[method.value];
          const isActive = paymentMethod === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => setPaymentMethod(method.value)}
              className={`rounded-[1.5rem] border p-5 text-left transition-all duration-300 ${
                isActive
                  ? "border-[#ea580c] bg-white shadow-[0_18px_50px_rgba(234,88,12,0.12)]"
                  : "border-slate-200 bg-white hover:border-[#fdba74]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                  <Icon size={20} />
                </div>
                {isActive ? (
                  <CheckCircle2 className="text-[#ea580c]" size={18} />
                ) : null}
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
                {method.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {method.description}
              </p>
            </button>
          );
        })}
      </div>

      {!isCardMethod ? (
        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label>Mobile money provider</Label>
            <Select
              value={paymentState.mobileProvider}
              onValueChange={(value) => updateField("mobileProvider", value)}
            >
              <SelectTrigger className="h-12 rounded-2xl bg-white">
                <SelectValue placeholder="Choose provider" />
              </SelectTrigger>
              <SelectContent>
                {getMobileProviderOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="payment-mobile-account-name">Account name</Label>
            <Input
              id="payment-mobile-account-name"
              className="h-12 rounded-2xl bg-white"
              value={paymentState.mobileAccountName}
              onChange={(event) =>
                updateField("mobileAccountName", event.target.value)
              }
              required={!isCardMethod}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="payment-mobile-number">Mobile money number</Label>
            <Input
              id="payment-mobile-number"
              inputMode="tel"
              className="h-12 rounded-2xl bg-white"
              value={paymentState.mobileNumber}
              onChange={(event) => updateField("mobileNumber", event.target.value)}
              placeholder="+260 97 123 4567"
              required={!isCardMethod}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="payment-cardholder-name">Card holder name</Label>
            <Input
              id="payment-cardholder-name"
              className="h-12 rounded-2xl bg-white"
              value={paymentState.cardholderName}
              onChange={(event) =>
                updateField("cardholderName", event.target.value)
              }
              required={isCardMethod}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="payment-card-number">
              {selectedMethodLabel} card number
            </Label>
            <Input
              id="payment-card-number"
              inputMode="numeric"
              className="h-12 rounded-2xl bg-white"
              value={paymentState.cardNumber}
              onChange={(event) =>
                updateField("cardNumber", formatCardNumber(event.target.value))
              }
              placeholder="1234 5678 9012 3456"
              required={isCardMethod}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="payment-card-expiry">Expiry</Label>
              <Input
                id="payment-card-expiry"
                inputMode="numeric"
                className="h-12 rounded-2xl bg-white"
                value={paymentState.expiry}
                onChange={(event) =>
                  updateField("expiry", formatExpiry(event.target.value))
                }
                placeholder="MM/YY"
                required={isCardMethod}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="payment-card-cvv">Security code</Label>
              <Input
                id="payment-card-cvv"
                type="password"
                inputMode="numeric"
                maxLength={4}
                className="h-12 rounded-2xl bg-white"
                value={paymentState.cvv}
                onChange={(event) =>
                  updateField("cvv", event.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="CVV"
                required={isCardMethod}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentDetailsSection;
