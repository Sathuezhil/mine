import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Parisienne } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Little Story",
  description: "Sathu & Ezhil — a collection of the moments I never want to forget…",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2c1a1c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${hand.variable} ${script.variable}`}
    >
      <body className="font-serif antialiased">
        <noscript>
          <style>{`body{overflow:visible!important;height:auto!important}#album-cover{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
