import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Easy Rx Cycle — Regulated Waste Destruction, Made Simple",
  description:
    "DEA-registered mail-back kits and on-site destruction for every stream of pharmaceutical and medical waste. Fill it, seal it, ship it — and get your Certificate of Destruction. No pickups, no contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
