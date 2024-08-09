import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@styles/flex.css";
import "@styles/spacing.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel application",
  description: "Application built to show information about Marvel characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
