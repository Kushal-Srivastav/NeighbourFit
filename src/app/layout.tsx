import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AOSInitializer from '@/components/AOSInitializer';
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeighborFit - Find Your Perfect Neighborhood",
  description: "Discover neighborhoods that match your lifestyle, budget, and dreams using AI-powered insights and real resident reviews. Trusted by 10,000+ homebuyers nationwide.",
  keywords: ["neighborhood finder", "real estate", "home buying", "neighborhood reviews", "AI home search"],
  authors: [{ name: "NeighborFit Team" }],
  creator: "NeighborFit",
  publisher: "NeighborFit Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://neighborfit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NeighborFit - Find Your Perfect Neighborhood",
    description: "Discover neighborhoods that match your lifestyle, budget, and dreams using AI-powered insights and real resident reviews.",
    url: "https://neighborfit.com",
    siteName: "NeighborFit",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NeighborFit - Find Your Perfect Neighborhood",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeighborFit - Find Your Perfect Neighborhood",
    description: "Discover neighborhoods that match your lifestyle, budget, and dreams using AI-powered insights and real resident reviews.",
    images: ["/og-image.jpg"],
    creator: "@neighborfit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        <ClerkProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <AOSInitializer />
        </ClerkProvider>
      </body>
    </html>
  );
}
