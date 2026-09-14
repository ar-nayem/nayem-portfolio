import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/motion/Preloader";
import CustomCursor from "@/components/motion/CustomCursor";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PageTransition from "@/components/motion/PageTransition";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://arnayem.top";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MD Aminur Rahman Nayem | Project Manager & International Operations",
  description:
    "Portfolio of MD Aminur Rahman Nayem — Project Manager and International Operations Specialist delivering cross-border projects, supply chain coordination, and process optimization.",
  keywords: [
    "Nayem",
    "Project Manager",
    "International Operations",
    "Supply Chain",
    "Portfolio",
  ],
  authors: [{ name: "MD Aminur Rahman Nayem" }],
  openGraph: {
    title: "MD Aminur Rahman Nayem | Project Manager & International Operations",
    description:
      "Portfolio of MD Aminur Rahman Nayem — Project Manager and International Operations Specialist.",
    url: siteUrl,
    siteName: "Nayem's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Aminur Rahman Nayem | Project Manager & International Operations",
    description:
      "Portfolio of MD Aminur Rahman Nayem — Project Manager and International Operations Specialist.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-primary">
        <MotionConfig reducedMotion="user">
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <SmoothScroll />
          <Preloader />
          <CustomCursor />
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
