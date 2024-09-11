import type { Metadata } from "next";
import "./globals.css";
import "@styles/flex.css";
import "@styles/spacing.css";
import { FavoritesContextProvider } from "@contexts/FavoritesContext";
import Header from "@components/Header";


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
      <body> 
        <FavoritesContextProvider>
          <Header />
          {children}
        </FavoritesContextProvider>
      </body>
    </html>
  );
}
