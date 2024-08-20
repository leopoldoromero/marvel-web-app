import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@styles/flex.css";
import "@styles/spacing.css";
import { CharacterContextProvider } from "@contexts/CharacterContext";
import { FavoritesContextProvider } from "@contexts/FavoritesContext";
import Header from "@components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel application",
  description: "Application built to show information about Marvel characters",
};

export function envHelper() {
  const params = {
    NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
  }

  return () => params;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <CharacterContextProvider>
          <FavoritesContextProvider>
            <Header />
              {children}
          </FavoritesContextProvider>
        </CharacterContextProvider>
      </body>
    </html>
  );
}
