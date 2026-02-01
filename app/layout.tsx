import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import "./globals.css";
import { BackgroundLogoField } from "@/components/BackgroundLogoField";

function getSiteUrl() {
  // Vercel expose VERCEL_URL = "mon-site.vercel.app"
  const vercel = process.env.VERCEL_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

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
  metadataBase: getSiteUrl(),
  title: "Pulse Premium — Photo de profil TikTok",
  description:
    "Générateur de photo de profil TikTok premium : choisis ton cadre, ajuste ta photo, télécharge en HD.",
  openGraph: {
    title: "Pulse Premium — Photo de profil TikTok",
    description:
      "Choisis ton cadre, ajuste ta photo, télécharge en HD. Interface premium et animations.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Pulse Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse Premium",
    description: "Photo de profil TikTok premium — cadres animés + export HD.",
    images: ["/opengraph-image"],
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
