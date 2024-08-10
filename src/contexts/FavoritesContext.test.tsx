import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { FavoritesContextProvider, useFavoritesContext } from '@contexts/FavoritesContext';
import { CookieHandler } from '@utils/cookies-handler';


jest.mock('@utils/cookies-handler');

describe('FavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize favorites from cookies', () => {
    (CookieHandler.get as jest.Mock).mockReturnValue('1,2,3');
    
    const TestComponent = () => {
      const { favorites } = useFavoritesContext();
      return <div data-testid="favorites">{favorites.join(',')}</div>;
    };

    render(
      <FavoritesContextProvider>
        <TestComponent />
      </FavoritesContextProvider>
    );

    expect(screen.getByTestId('favorites').textContent).toBe('1,2,3');
  });

  it('should add a new favorite and update the cookie', () => {
    (CookieHandler.get as jest.Mock).mockReturnValue('');

    const TestComponent = () => {
      const { favorites, addFavorite } = useFavoritesContext();
      return (
        <div>
          <div data-testid="favorites">{favorites.join(',')}</div>
          <button onClick={() => addFavorite(4)}>Add Favorite</button>
        </div>
      );
    };

    render(
      <FavoritesContextProvider>
        <TestComponent />
      </FavoritesContextProvider>
    );

    act(() => {
      screen.getByText('Add Favorite').click();
    });

    expect(screen.getByTestId('favorites').textContent).toBe('4');
  });

  it('should not add duplicate favorites', () => {
    (CookieHandler.get as jest.Mock).mockReturnValue('1,2');

    const TestComponent = () => {
      const { favorites, addFavorite } = useFavoritesContext();
      return (
        <div>
          <div data-testid="favorites">{favorites.join(',')}</div>
          <button onClick={() => addFavorite(2)}>Add Favorite</button>
        </div>
      );
    };

    render(
      <FavoritesContextProvider>
        <TestComponent />
      </FavoritesContextProvider>
    );

    act(() => {
      screen.getByText('Add Favorite').click();
    });

    expect(screen.getByTestId('favorites').textContent).toBe('1,2');
  });
});
