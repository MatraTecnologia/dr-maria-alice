import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
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
        </head>
        <body className={`${inter.variable} antialiased`}>
          <GoogleAdsTag />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
