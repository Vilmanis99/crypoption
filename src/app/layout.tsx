import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangSetter from "@/components/LangSetter";
import NewsletterPopup from "@/components/NewsletterPopup";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "CrypOptionHub – Trusted Binary Options Reviews & Strategies",
    template: "%s | CrypOptionHub",
  },
  description:
    "CrypOptionHub provides expert reviews of binary options brokers, trading strategies, signals, and educational content.",
  metadataBase: new URL("https://crypoptionhub.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CrypOptionHub',
              url: 'https://crypoptionhub.com',
              logo: 'https://crypoptionhub.com/images/2024/09/Dark-BG-Logo-e1726598075350.png',
              sameAs: [
                'https://www.youtube.com/@crypoptionhub',
                'https://www.instagram.com/crypoptionhub/',
                'https://www.tiktok.com/@crypoptionhub',
              ],
            }),
          }}
        />
        <LangSetter />
        <Header />
        {children}
        <Footer />
        <NewsletterPopup />
      </body>
    </html>
  );
}
