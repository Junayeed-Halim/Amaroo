import type { Metadata } from "next";

import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: "Home | Amaroo Buyer Web",
  description:
    "Shop Amaroo's buyer homepage with featured categories, flash-sale countdown deals, and personalized recommendations.",
};

export default function Home() {
  return <HomePage />;
}
