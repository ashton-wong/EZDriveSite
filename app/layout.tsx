import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plover",
  description:
    "Plug in, drive easy. Plover translates every warning light, beep, and cryptic fault code into plain English with clear next steps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
