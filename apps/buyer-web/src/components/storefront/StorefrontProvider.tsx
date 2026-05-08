"use client";

import { createContext, useContext, useMemo, useState } from "react";

import {
  translations,
  type Locale,
} from "@/data/storefront";

type StorefrontContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  t: (typeof translations)[Locale];
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function StorefrontProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, setLocale] = useState<Locale>("en");

  const value = useMemo(
    () => ({
      locale,
      toggleLocale: () =>
        setLocale((currentLocale) => (currentLocale === "en" ? "bn" : "en")),
      t: translations[locale],
    }),
    [locale],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }

  return context;
}
