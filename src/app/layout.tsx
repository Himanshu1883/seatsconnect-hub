import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "@fontsource-variable/mona-sans";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football, Rugby & F1 Tickets | SeatsConnect",
  description:
    "Official sports tickets and matchday hospitality for the Premier League, La Liga, rugby, tennis and Formula 1. Trusted by fans in over 100 countries.",
  icons: { icon: "/seatsconnect-mark.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sand text-brand-dark">{children}</body>
    </html>
  );
}
