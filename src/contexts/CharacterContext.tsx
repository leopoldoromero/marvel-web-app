'use client';
import { Character } from '@character/domain/character';
import { charactersFinder } from '@modules/di.container';
import { createContext, useState, useContext, useEffect } from 'react';

interface CharacterContextState {
  characters: Character[];
  isLoading: boolean;
  setSearchParam: (value: string) => void;
  getCharacters: (nameStartsWith?: string, page?: number, perPage?: number) => void;
}

export const CharacterContext = createContext<CharacterContextState>({
  characters: [],
  isLoading: false,
  setSearchParam: () => {},
  getCharacters: () => {},
});

export function CharacterContextProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchParam, setSearchParam] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log('FINDER::', charactersFinder)
  function getCharacters(nameStartsWith?: string, page?: number, perPage?: number) {
    setIsLoading(true);
      charactersFinder.execute(nameStartsWith, page, perPage).then((items) => {
        setCharacters(items);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    getCharacters(searchParam);
  }, [searchParam]);

  return (
    <CharacterContext.Provider value={{ characters, isLoading, getCharacters, setSearchParam }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  return useContext(CharacterContext);
}
