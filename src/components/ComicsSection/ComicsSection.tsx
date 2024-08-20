import ComicCard from '@components/ComicCard';
import './comics-section.styles.css';
import { Comic } from '@character/domain/comic';

interface Props {
  comics: Array<Comic>;
}

const ComicsSection: React.FC<Props> = ({comics}) => (
  <section className='comics-section'>
      <div className='comics-section__content'>
        <div className='content__title-wrapper'>
          <h2 className='title-wrapper__text'>comic</h2>
        </div>
        <div className='content__commics-list'>
          {comics?.map((comic) => (
            <ComicCard
              key={comic.id}
              name={comic.title}
              imageSrc={comic.image}
              year={comic.year}
            />
          ))}
        </div>
      </div>
    </section>
);

export default ComicsSection;
