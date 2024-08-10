import React from 'react';
import { render } from '@testing-library/react';
import { CharacterContextProvider } from '@contexts/CharacterContext';
import { FavoritesContextProvider } from '@contexts/FavoritesContext';
import Header from '@components/Header';

const renderHelper = (children: React.ReactNode) =>
  render(
    <CharacterContextProvider>
          <FavoritesContextProvider>
            <Header />
              {children}
          </FavoritesContextProvider>
    </CharacterContextProvider>
  );

export default renderHelper;
