import type { Metadata } from "next";
import "./globals.css";
import { diContainer } from "@modules/di.container";


export const metadata: Metadata = {
  title: "Marvel application",
  description: "Application built to show information about Marvel characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const apiBaseUrl = process.env.PUBLIC_MARVEL_API_URL ?? '';
    const publicKey = process.env.PUBLIC_MARVEL_PUBLIC_KEY ?? '';
    const privateKey = process.env.PUBLIC_MARVEL_PRIVATE_KEY ?? '';
    
    try {
      diContainer.initialize({ apiBaseUrl, publicKey, privateKey });
    } catch (error) {
      console.error(error)
    }
  return (
    <html lang="en">
      <body> 
        {children}
      </body>
    </html>
  );
}
