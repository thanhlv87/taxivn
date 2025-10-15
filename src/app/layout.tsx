import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taxi Việt Nam - Tìm và gọi taxi nhanh chóng",
  description: "Ứng dụng tìm kiếm và gọi taxi tại 34 tỉnh thành Việt Nam. Nhanh chóng, tiện lợi, dễ sử dụng.",
  keywords: ["Taxi Việt Nam", "taxi", "gọi taxi", "Việt Nam", "di chuyển", "ô tô"],
  authors: [{ name: "ThanhLV87 & Z.ai" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon.png",
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Taxi Việt Nam",
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: "Taxi Việt Nam - Tìm và gọi taxi nhanh chóng",
    description: "Ứng dụng tìm kiếm và gọi taxi tại 34 tỉnh thành Việt Nam",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary",
    title: "Taxi Việt Nam",
    description: "Tìm và gọi taxi nhanh chóng tại 34 tỉnh thành Việt Nam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Taxi Việt Nam" />
        <meta name="application-name" content="Taxi Việt Nam" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
