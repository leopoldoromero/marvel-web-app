import React from 'react';
import { render } from '@testing-library/react';
import { CharacterContextProvider } from '@contexts/CharacterContext';
import { FavoritesContextProvider } from '@contexts/FavoritesContext';

const renderHelper = (children: React.ReactNode) =>
  render(
    <CharacterContextProvider>
          <FavoritesContextProvider>
              {children}
          </FavoritesContextProvider>
    </CharacterContextProvider>
  );

export default renderHelper;
