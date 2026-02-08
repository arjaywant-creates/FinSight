import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FinSight - Financial Magic",
  description: "A magical financial insights app. Wave your wand over your finances and conjure actionable insights.",
  openGraph: {
    title: "FinSight - Financial Magic",
    description: "Wave your wand over your finances and conjure actionable insights.",
    url: defaultUrl,
    siteName: "FinSight",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 720,
        alt: "FinSight - Financial Magic",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinSight - Financial Magic",
    description: "Wave your wand over your finances and conjure actionable insights.",
    images: ["/og-image.jpg"],
  },
};

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Sans({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
