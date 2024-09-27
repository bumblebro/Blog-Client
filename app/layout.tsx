import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import AnalyticsScript from "@/components/AnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  title: {
    default: "Word of Many",
    template: "%s | Word of Many",
  },
  description:
    "Discover the world's leading lifestyle platform, Word of Many, featuring the latest trends in products, culture, and style from all categories around the globe.",
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: `/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Script
          strategy="worker"
          src={`https://www.googletagmanager.com/gtag/js?id=G-GR0NLTCFVB`}
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GR0NLTCFVB', { 
                page_path: window.location.pathname,
            });
        `,
          }}
        /> */}
        <NextTopLoader showSpinner={false} color="#0050f0" crawlSpeed={50} />
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-GR0NLTCFVB`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GR0NLTCFVB');
          `,
        }}
      />
      {/* <GoogleAnalytics gaId="G-GR0NLTCFVB" /> */}
    </html>
  );
}
