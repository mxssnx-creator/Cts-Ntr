import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initializeDatabase } from "@/lib/initDb";
import AuthProvider from "./auth-provider";

// Initialize database on first layout render
// This runs only once per server instance in development
let dbInitialized = false;
if (!dbInitialized) {
  initializeDatabase().catch(console.error);
  dbInitialized = true;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CTS - Crypto Trading Dashboard",
  description: "Professional automated cryptocurrency trading platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}