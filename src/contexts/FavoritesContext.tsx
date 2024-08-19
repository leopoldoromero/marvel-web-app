'use client';
import { characterFinder } from '@modules/di.container';
import { CookieHandler } from '@utils/cookies-handler';
import { createContext, useState, useContext, useEffect, useReducer } from 'react';


interface FavoritesContextState {
  favorites: number[];
  handleFavorites: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextState>({
  favorites: [],
  handleFavorites: (): void => {},
});

export function FavoritesContextProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const cookie = CookieHandler.get('favorites');
    if (cookie) {
      setFavorites(cookie.split(',').map((id) => parseInt(id)));
    }
  }, []);

  const handleFavorites = (id: number): void => {
    const updatedFavorites = favorites.includes(id) ? favorites.filter((favId) => favId !== id) : [...favorites, id];
    setFavorites(updatedFavorites);
    CookieHandler.set('favorites', updatedFavorites.join(','));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, handleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
