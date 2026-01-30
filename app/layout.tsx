import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import "./globals.css";
import { BackgroundLogoField } from "@/components/BackgroundLogoField";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const russo = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Premium — Générateur de bannières HD",
  description: "Créez des bannières HD avec logo et texte. Interface dark premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${russo.variable}`}>
      <body className="font-sans">
        <BackgroundLogoField />
        {children}
      </body>
    </html>
  );
}
