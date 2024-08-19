import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { CharacterContextProvider, useCharacterContext } from './CharacterContext';
import { charactersFinder } from 'modules/di.container';
import { Character } from '@character/domain/character';

jest.mock('@modules/di.container', () => ({
  charactersFinder: {
    execute: jest.fn(),
  },
}));

describe('CharacterContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockCharacters: Array<Character> = [
      {
      id: 1011334,
      name: '3-D Man',
      description: '',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg',
      comics: [],
    },
    {
      id: 1017100,
      name: 'A-Bomb (HAS).',
      description: '',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg',
      comics: [],
    },
    {
      id: 1009144,
      name: 'A.I.M.',
      description: '',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec.jpg',
      comics: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty characters and loading false', () => {
    const TestComponent = () => {
      const { characters, isLoading } = useCharacterContext();
      return (
        <div>
          <div data-testid="characters">{characters.length}</div>
          <div data-testid="isLoading">{isLoading.toString()}</div>
        </div>
      );
    };

    render(
      <CharacterContextProvider>
        <TestComponent />
      </CharacterContextProvider>
    );

    expect(screen.getByTestId('characters').textContent).toBe('0');
    expect(screen.getByTestId('isLoading').textContent).toBe('false');
  });

  it('should set characters correctly when the service returns them', async () => {
    (charactersFinder.execute as jest.Mock).mockResolvedValue(mockCharacters);

    const TestComponent = () => {
      const { characters, isLoading, getCharacters } = useCharacterContext();
      return (
        <div>
          <div data-testid="characters">{characters.length}</div>
          <div data-testid="isLoading">{isLoading.toString()}</div>
          <button onClick={() => getCharacters()}>Fetch Characters</button>
        </div>
      );
    };

    render(
      <CharacterContextProvider>
        <TestComponent />
      </CharacterContextProvider>
    );

    
    act(() => {
      screen.getByText('Fetch Characters').click();
    });
    expect(screen.getByTestId('isLoading').textContent).toBe('true');

    await waitFor(() => {
      expect(screen.getByTestId('isLoading').textContent).toBe('false');
      expect(screen.getByTestId('characters').textContent).toBe('3');
    });
  });

  it('should call get characters with search param', async () => {
    (charactersFinder.execute as jest.Mock).mockResolvedValue(mockCharacters);

    const TestComponent = () => {
      const { characters, isLoading, getCharacters } = useCharacterContext();
      return (
        <div>
          <div data-testid="characters">{characters.length}</div>
          <div data-testid="isLoading">{isLoading.toString()}</div>
          <button onClick={() => getCharacters('abcd')}>Fetch Characters</button>
        </div>
      );
    };

    render(
      <CharacterContextProvider>
        <TestComponent />
      </CharacterContextProvider>
    );

    act(() => {
      screen.getByText('Fetch Characters').click();
    });
  
    await waitFor(() => {
      expect(charactersFinder.execute as jest.Mock).toHaveBeenCalledWith('abcd', undefined, undefined);
      expect(screen.getByTestId('characters').textContent).toBe('3');
    });
  });
});
