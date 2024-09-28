import Header from "@components/Header";
import { FavoritesContextProvider } from "@contexts/FavoritesContext";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <FavoritesContextProvider>
          <Header />
          {children}
        </FavoritesContextProvider>
    )
  }