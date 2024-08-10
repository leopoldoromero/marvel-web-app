'use client';
import * as React from 'react';
import './header.styles.css';
import { HeartIcon, LogoIcon } from '@components/Icons';
import { useFavoritesContext } from '@contexts/FavoritesContext';
import Logo from '@components/Logo';

const Header: React.FC = () => {
  const { favorites, addFavorite } = useFavoritesContext();
  return (
    <header className='header' data-testid='header_test_id'>
      <div>
        <Logo />
      </div>
      <div className='header__favorites'>
        <HeartIcon isSelected onClick={() => addFavorite(1)} />
        <span className='favorites-count'>{favorites.length}</span>
      </div>
    </header>
  );
};

export default Header;
