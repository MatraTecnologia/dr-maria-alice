import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import Script from "next/script";
import GoogleAdsTag from "@/components/GoogleAdsTag";
import SchemaOrg from "@/components/SchemaOrg";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dramariaalice.com"),
  title: {
    default: "Dra. Maria Alice | Clínica Médica e Medicina Integrativa",
    template: "%s | Dra. Maria Alice"
  },
  description: "Clínica Dra. Maria Alice Fernandes de Miranda em Santana, SP. Focada em Longevidade Saudável, Medicina Integrativa, Ortomolecular e Emagrecimento.",
  keywords: ["Dra. Maria Alice", "Medicina Integrativa", "Ortomolecular", "Emagrecimento", "Longevidade Saudável", "Santana SP", "Clínica Médica"],
  authors: [{ name: "Dra. Maria Alice Fernandes de Miranda" }],
  creator: "Dra. Maria Alice",
  publisher: "Dra. Maria Alice",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://dramariaalice.com",
    siteName: "Dra. Maria Alice",
    title: "Dra. Maria Alice | Clínica Médica e Medicina Integrativa",
    description: "Atendimento humanizado focado na Longevidade Saudável e Medicina Integrativa em Santana, SP.",
    images: [
      {
        url: "/og-image.jpg", // Needs to exist or be generated
        width: 1200,
        height: 630,
        alt: "Dra. Maria Alice Fernandes de Miranda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Maria Alice | Clínica Médica e Medicina Integrativa",
    description: "Atendimento humanizado focado na Longevidade Saudável e Medicina Integrativa em Santana, SP.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://dramariaalice.com",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <SchemaOrg />
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PQJRPSLN');
            `}
          </Script>
        </head>
        <body className={`${inter.variable} antialiased`}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PQJRPSLN"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <GoogleAdsTag />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
