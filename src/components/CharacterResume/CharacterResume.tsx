'use client';
import { HeartIcon } from '@components/Icons';
import { useFavoritesContext } from '@contexts/FavoritesContext';
import Image from 'next/image';
import './character-resume.styles.css';

interface Props {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
}

const CharacterResume: React.FC<Props> = ({ id, name, imageSrc, description }) => {
  const { favorites, addFavorite } = useFavoritesContext();
  const isFavorite = favorites.includes(id);

  return (
    <section className={`character-resume`}>
      <div className='character-resume__content'>
        <div className={`character-resume__character-photo `}>
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
        <div className={`character-resume__character-info`}>
          <div className='d-flex flex-d-column justify-content-center p-top-2 p-right-2 p-bottom-3 p-left-2 h-100'>
            <div className='d-flex justify-content-between align-items-center m-bottom-2'>
              <h3 className='character-info__name'>{name}</h3>
              <HeartIcon isSelected={isFavorite} onClick={() => addFavorite(id)} />
            </div>
            {description && <p className='character-info__description'>{description}</p>}
          </div>
        </div>
        <div className='character-resume__cut'></div>
      </div>
    </section>
  );
};

export default CharacterResume;
