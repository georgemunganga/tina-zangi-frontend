import React, { createContext, useContext, useMemo } from "react";
import { getPaymentOptionsByCountry } from "@/lib/payment";

const CommerceContext = createContext(null);
const DEFAULT_COUNTRY_CODE = "ZM";
const SITE_CURRENCY_CODE = "ZMW";
const SITE_LOCALE = "en-ZM";
const USD_TO_ZMW = 28;

function getBrowserLocale() {
  if (typeof window === "undefined") {
    return "en-ZM";
  }

  const browserLocale =
    window.navigator.language ||
    window.navigator.languages?.[0] ||
    Intl.DateTimeFormat().resolvedOptions().locale;

  return browserLocale || "en-ZM";
}

function extractRegionFromLocale(locale) {
  if (!locale) {
    return null;
  }

  try {
    const intlLocale = new Intl.Locale(locale);

    if (intlLocale.region) {
      return intlLocale.region.toUpperCase();
    }
  } catch (error) {
    const match = String(locale).match(/[-_](\w{2})\b/);

    if (match?.[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

function detectCountryCode() {
  if (typeof window === "undefined") {
    return DEFAULT_COUNTRY_CODE;
  }

  const override = window.localStorage.getItem("zangi-country-override");

  if (override) {
    return override.toUpperCase();
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  if (timeZone === "Africa/Lusaka") {
    return "ZM";
  }

  const locales = [
    ...(window.navigator.languages || []),
    window.navigator.language,
    Intl.DateTimeFormat().resolvedOptions().locale,
  ].filter(Boolean);

  for (const locale of locales) {
    const region = extractRegionFromLocale(locale);

    if (region) {
      return region;
    }
  }

  return DEFAULT_COUNTRY_CODE;
}

function convertAmount(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  if (fromCurrency === "USD" && toCurrency === "ZMW") {
    return amount * USD_TO_ZMW;
  }

  if (fromCurrency === "ZMW" && toCurrency === "USD") {
    return amount / USD_TO_ZMW;
  }

  return amount;
}

function roundCurrencyAmount(value) {
  return Number(value.toFixed(2));
}

function formatCurrency(value, currencyCode, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function getCurrencyLocale(currencyCode, browserLocale) {
  return currencyCode === SITE_CURRENCY_CODE ? SITE_LOCALE : browserLocale || "en-US";
}

function filterVisibleBookFormats(formats, { isZambian } = {}) {
  const normalizedFormats = Array.isArray(formats) ? formats : [];

  if (isZambian) {
    return normalizedFormats.filter((format) => format?.type !== "digital");
  }

  return normalizedFormats;
}

export const CommerceProvider = ({ children }) => {
  const browserLocale = useMemo(() => getBrowserLocale(), []);
  const countryCode = useMemo(() => detectCountryCode(), []);
  const isZambian = countryCode === "ZM";
  const currencyCode = isZambian ? SITE_CURRENCY_CODE : "USD";
  const value = useMemo(() => {
    const convertFromUsdToCurrency = (amount, targetCurrency = currencyCode) =>
      roundCurrencyAmount(convertAmount(amount, "USD", targetCurrency));

    const formatFromUsdToCurrency = (amount, targetCurrency = currencyCode) =>
      formatCurrency(
        convertFromUsdToCurrency(amount, targetCurrency),
        targetCurrency,
        getCurrencyLocale(targetCurrency, browserLocale),
      );

    const convertFromUsd = (amount) =>
      convertFromUsdToCurrency(amount, currencyCode);

    const formatFromUsd = (amount) =>
      formatFromUsdToCurrency(amount, SITE_CURRENCY_CODE);

    const formatCheckoutFromUsd = (amount) =>
      formatFromUsdToCurrency(amount, currencyCode);

    const formatStoredAmount = (amount, amountCurrency = "USD") =>
      formatCurrency(
        roundCurrencyAmount(amount),
        amountCurrency,
        getCurrencyLocale(amountCurrency, browserLocale),
      );

    return {
      browserLocale,
      countryCode,
      isZambian,
      currencyCode,
      siteCurrencyCode: SITE_CURRENCY_CODE,
      getVisibleBookFormats(formats) {
        return filterVisibleBookFormats(formats, { isZambian });
      },
      getCheckoutPaymentOptions({
        purchaseType,
        formatType,
        currencyCode: checkoutCurrencyCode,
      }) {
        const effectiveCurrencyCode = checkoutCurrencyCode || currencyCode;

        return getPaymentOptionsByCountry({
          isZambian: effectiveCurrencyCode === SITE_CURRENCY_CODE,
          purchaseType,
          formatType,
        });
      },
      convertFromUsd,
      convertFromUsdToCurrency,
      formatFromUsd,
      formatFromUsdToCurrency,
      formatCheckoutFromUsd,
      formatStoredAmount,
      checkoutNotice: isZambian
        ? "Choose Mobile Money or Card to complete checkout in Zambian Kwacha."
        : "Checkout switches to USD for international buyers and uses Card for online payment.",
      pricingNotice: isZambian
        ? "Prices are displayed in Zambian Kwacha."
        : "Prices are displayed in Zambian Kwacha. Checkout switches to USD for international payments.",
    };
  }, [browserLocale, countryCode, currencyCode, isZambian]);

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);

  if (!context) {
    throw new Error("useCommerce must be used within CommerceProvider");
  }

  return context;
};
