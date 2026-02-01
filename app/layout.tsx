import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import "./globals.css";
import { BackgroundLogoField } from "@/components/BackgroundLogoField";

const SITE_URL = new URL("https://pulse-premium-generator.vercel.app");

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
  // IMPORTANT: Discord/aperçus ont besoin d'une URL absolue atteignable (pas localhost).
  metadataBase: SITE_URL,
  title: "Pulse Premium — Photo de profil TikTok",
  description:
    "Générateur de photo de profil TikTok premium : choisis ton cadre, ajuste ta photo, télécharge en HD.",
  openGraph: {
    title: "Pulse Premium — Photo de profil TikTok",
    description:
      "Choisis ton cadre, ajuste ta photo, télécharge en HD. Interface premium et animations.",
    type: "website",
    // Image statique (fiable pour les previews de partage)
    images: [
      {
        url: "/frames/original.png.png",
        width: 1080,
        height: 1080,
        alt: "Pulse Premium",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse Premium",
    description: "Photo de profil TikTok premium — cadres animés + export HD.",
    images: ["/frames/original.png.png"],
  },
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
