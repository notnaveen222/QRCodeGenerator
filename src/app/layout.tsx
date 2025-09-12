import type { Metadata } from "next";
import "./globals.css";
import { neueGrotesk } from "@/fonts/font";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "QRC Gen",
  description: "Simple QR Code Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neueGrotesk.variable} max-w-2xl mx-auto px-2 flex flex-col min-h-screen antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
