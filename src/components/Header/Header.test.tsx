import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@components/Header';

jest.mock('@contexts/FavoritesContext', () => ({
    useFavoritesContext: () => ({
      favorites: [],
    }),
  }));

describe('[[Header Test]]', () => {
  it('should render the Header component correctly', () => {
    render(<Header />)

    expect(screen.getByTestId('header_test_id')).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
  });
});
