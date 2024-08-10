'use client';
import Image from 'next/image';
import './character-card.styles.css';
import { HeartIcon } from '@components/Icons';
import { useFavoritesContext } from '@contexts/FavoritesContext';

interface Props {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  isDetailsPage?: boolean;
}
const CharacterCard: React.FC<Props> = ({ id, name, imageSrc, description, isDetailsPage }) => {
  const { favorites, addFavorite } = useFavoritesContext();
  const isFavorite = favorites.includes(id);
  const showDescription = isDetailsPage && description;
  return (
    <div className={`character-card ${isDetailsPage ? 'character-card--details' : ''}`}>
      <div>
        <div
          className={`character-card__character-photo  ${isDetailsPage ? 'character-card__character-photo--details' : ''}`}
        >
          <Image
            src={imageSrc}
            alt={`${name}-marvel-character`}
            className='character-photo__image'
            width={100}
            height={100}
            unoptimized={true}
            loading='lazy'
          />
        </div>
        <div
          className={`character-card__character-info ${isDetailsPage && 'character-card__character-info--details'}`}
        >
          {!isDetailsPage && <div className='character-info__rectangle'></div>}
          <div className='d-flex flex-d-column justify-content-center p-top-2 p-right-2 p-bottom-3 p-left-2 h-100'>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='character-info__title'>{name}</h3>
              <HeartIcon isSelected={isFavorite} onClick={() => addFavorite(id)} />
            </div>
            {showDescription && (
              <p className='character-info__description'>{description}</p>          )}
          </div>
        </div>
      </div>
      <div className='character-card__cut'></div>
    </div>
  );
};

export default CharacterCard;
