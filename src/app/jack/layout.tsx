import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./jack.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nayem -- Project Manager",
};

export default function JackLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kanit.variable}`} style={{ background: "#0C0C0C" }}>
      <body id="root" style={{ background: "#0C0C0C" }}>
        {children}
      </body>
    </html>
  );
}
