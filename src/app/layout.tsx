import type { Metadata } from "next";
import { Cairo, Playfair_Display, Poppins } from "next/font/google";
import { Providers } from "@/context/Providers";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://la-moda-style-corner.vercel.app"),
  title: {
    default: "LA MODA STYLE CORNER",
    template: "%s | LA MODA STYLE CORNER",
  },
  description: "Fashion for Everyone, in One Place — boutique demo for women, boys, and girls.",
  openGraph: {
    title: "LA MODA STYLE CORNER",
    description: "Fashion for Everyone, in One Place",
    images: ["/images/la-moda-logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${playfair.variable} ${poppins.variable} ${cairo.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
