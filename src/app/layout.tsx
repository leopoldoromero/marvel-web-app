import type { Metadata } from "next";
import "./globals.css";
import "@styles/flex.css";
import "@styles/spacing.css";
import Head from "next/head";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <body> 
          {children}
      </body>
    </html>
  );
}
