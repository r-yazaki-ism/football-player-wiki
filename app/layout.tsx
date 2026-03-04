import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "アマチュアサッカー選手名鑑",
  description: "大学・高校・中学・アマチュアなど、草の根サッカー選手のwiki型名鑑サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased bg-white min-h-screen`}>
        <SessionProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
          <footer className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-400">
            <p>アマチュアサッカー選手名鑑 &mdash; 誰でも編集できるサッカー百科</p>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
