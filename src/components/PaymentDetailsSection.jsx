import React from "react";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import {
  getPaymentMethodLabel,
  isCashOnDeliveryMethod,
  isOnlinePaymentMethod,
} from "@/lib/payment";

const iconMap = {
  "mobile-money": Smartphone,
  card: CreditCard,
  "cash-on-delivery": Banknote,
};

const PaymentDetailsSection = ({
  paymentMethod,
  setPaymentMethod,
  paymentOptions,
  notice,
}) => {
  const selectedMethod = paymentOptions.find(
    (method) => method.value === paymentMethod,
  );

  return (
    <section className="rounded-[2rem] pt-6 sm:pt-7">
      <h2 className="mt-4 text-4xl font-semibold text-[#7c2d12]">
        Payment Method
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {paymentOptions.map((method) => {
          const Icon = iconMap[method.value] || CreditCard;
          const isActive = paymentMethod === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => setPaymentMethod(method.value)}
              className={`rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                isActive
                  ? "border-2 border-[#ea580c] bg-[#c2410c] shadow-[0_18px_50px_rgba(234,88,12,0.12)]"
                  : "border-2 border-slate-700 bg-white ring-1 ring-slate-300 shadow-[0_10px_24px_rgba(15,23,42,0.04)] hover:border-[#fdba74] hover:bg-[#fffaf5]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`inline-flex items-center justify-center rounded-full p-4 ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-[#fff7ed] text-[#ea580c]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.1em] ${
                        isActive ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {method.label}
                    </p>
                    <p
                      className={`mt-1 text-sm ${
                        isActive ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {method.description}
                    </p>
                  </div>
                </div>
                {isActive ? (
                  <CheckCircle2 className="text-white" size={18} />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      {selectedMethod ? (
        <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-[#fffaf5] p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-[#0f766e]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {getPaymentMethodLabel(selectedMethod.value)}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {isOnlinePaymentMethod(selectedMethod.value)
                  ? "When you continue, the secure Lenco payment window opens so you can complete the payment without entering raw card or mobile-money details inside the site."
                  : "This order will be created now and payment stays pending until the hardcopy is delivered."}
              </p>
              {isCashOnDeliveryMethod(selectedMethod.value) ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Payment on Delivery is available only for Zambia hardcopy book orders in this phase.
                </p>
              ) : null}
              {notice ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">{notice}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default PaymentDetailsSection;
