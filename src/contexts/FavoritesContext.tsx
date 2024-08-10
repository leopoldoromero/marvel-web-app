'use client';
import { CookieHandler } from '@utils/cookies-handler';
import { createContext, useState, useContext, useEffect } from 'react';

interface FavoritesContextState {
  favorites: number[];
  addFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextState>({
  favorites: [],
  addFavorite: (): void => {},
});

export function FavoritesContextProvider({ children }: { children: React.ReactNode }) {
  let [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const cookie = CookieHandler.get('favorites');
    if (cookie) {
      setFavorites(cookie.split(',').map((id) => parseInt(id)));
    }
  }, []);

  const addFavorite = (id: number): void => {
    setFavorites([...new Set([...favorites, id])]);
    CookieHandler.set('favorites', favorites.join(','));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
