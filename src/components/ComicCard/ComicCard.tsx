import Image from 'next/image';
import './comic-card.styles.css';

interface Props {
  name: string;
  imageSrc: string;
  year: string;
}

const ComicCard: React.FC<Props> = ({ name, imageSrc, year }) => (
  <div className='comic-card'>
    <div className='comic-card__photo'>
      <Image
        src={imageSrc}
        alt={`${name}-marvel-comic`}
        className='comic-photo__image'
        width={100}
        height={100}
        unoptimized={true}
        loading='lazy'
      />
    </div>
    <div className='comic-card__info'>
      <h4 className='info__comic-title'>{name}</h4>
      <span className='info__comic-year'>{year}</span>
    </div>
  </div>
);

export default ComicCard;
