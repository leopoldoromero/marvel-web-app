'use client';
import { Character } from '@character/domain/character';
import { charactersFinder } from '@modules/di.container';
import { createContext, useState, useContext, useEffect } from 'react';

interface CharacterContextState {
  characters: Character[];
  isLoading: boolean;
  getCharacters: (nameStartsWith?: string, page?: number, perPage?: number) => void;
}

export const CharacterContext = createContext<CharacterContextState>({
  characters: [],
  isLoading: false,
  getCharacters: () => {},
});

export function CharacterContextProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getCharacters(nameStartsWith?: string, page?: number, perPage?: number) {
    setIsLoading(true);
      charactersFinder.execute(nameStartsWith, page, perPage).then((items) => {
        setCharacters(items);
        setIsLoading(false);
      })
  }

  return (
    <CharacterContext.Provider value={{ characters, isLoading, getCharacters }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  return useContext(CharacterContext);
}
