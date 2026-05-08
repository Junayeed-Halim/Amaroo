"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "bn";

const copy: Record<
  Locale,
  {
    appName: string;
    headline: string;
    subhead: string;
    trustSignals: string[];
    cta: string;
    langToggle: string;
  }
> = {
  en: {
    appName: "Amaroo",
    headline: "Epic, trusted shopping for Bangladesh",
    subhead:
      "Built for clarity, secure checkout, and transparent delivery updates for every buyer.",
    trustSignals: [
      "Secure checkout: bKash, Nagad, Rocket, SSLCommerz, AmarPay, Visa/Mastercard, COD",
      "Delivery partners: Pathao, Steadfast, REDX, Paperfly, Sundarban",
      "Accessible and bilingual experience (Bangla + English)",
    ],
    cta: "Start exploring products",
    langToggle: "Bangla",
  },
  bn: {
    appName: "আমারু",
    headline: "বাংলাদেশের জন্য বিশ্বাসযোগ্য, দুর্দান্ত অনলাইন শপিং",
    subhead:
      "সহজ ব্যবহার, নিরাপদ পেমেন্ট এবং স্বচ্ছ ডেলিভারি আপডেট—সবকিছু একসাথে।",
    trustSignals: [
      "নিরাপদ পেমেন্ট: bKash, Nagad, Rocket, SSLCommerz, AmarPay, Visa/Mastercard, COD",
      "ডেলিভারি পার্টনার: Pathao, Steadfast, REDX, Paperfly, Sundarban",
      "অ্যাক্সেসিবল ও দ্বিভাষিক অভিজ্ঞতা (বাংলা + ইংরেজি)",
    ],
    cta: "পণ্য দেখা শুরু করুন",
    langToggle: "English",
  },
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <div className="page-shell">
      <header className="topbar" aria-label="Top navigation">
        <div className="brand">{t.appName}</div>
        <button
          type="button"
          className="lang-btn"
          onClick={() => setLocale(locale === "en" ? "bn" : "en")}
          aria-label="Toggle language"
        >
          {t.langToggle}
        </button>
      </header>

      <main className="hero" aria-label="Buyer trust section">
        <p className="badge">Trusted Bangladesh Commerce Foundation</p>
        <h1>{t.headline}</h1>
        <p className="subhead">{t.subhead}</p>

        <ul>
          {t.trustSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>

        <button type="button" className="cta-btn">
          {t.cta}
        </button>
      </main>
    </div>
  );
}
