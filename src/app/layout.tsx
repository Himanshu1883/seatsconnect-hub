import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const monaSans = localFont({
  src: "./fonts/MonaSans-Variable.woff2",
  weight: "200 900",
  style: "normal",
  display: "swap",
  variable: "--font-mona",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeatsConnect — Official Tickets & Hospitality",
  description:
    "Discover official tickets, premium hospitality and specialist VIP event services worldwide with SeatsConnect.",
  icons: { icon: "/seatsconnect-mark.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sand text-brand-dark">{children}</body>
    </html>
  );
}
