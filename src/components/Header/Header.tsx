'use client';
import * as React from 'react';
import './header.styles.css';
import { HeartIcon } from '@components/Icons';
import { useFavoritesContext } from '@contexts/FavoritesContext';
import Logo from '@components/Logo';
import Link from 'next/link';

const Header: React.FC = () => {
  const { favorites } = useFavoritesContext();
  return (
    <header className='header' data-testid='header_test_id'>
      <div>
        <Logo />
      </div>
      <div className='header__favorites'>
        <Link href='/favorites' data-testid='favorites_link_test_id'>
          <HeartIcon isSelected />    
        </Link>
        <span className='favorites-count'>{favorites.length}</span>
      </div>
    </header>
  );
};

export default Header;
