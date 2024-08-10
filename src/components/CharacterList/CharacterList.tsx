'use client';
import { Character } from '@character/domain/character';
import CharacterCard from '@components/CharacterCard';
import './character-list.styles.css';
import Link from 'next/link';

interface Props {
  characters?: Array<Character>;
}

export const CharacterList: React.FC<Props> = ({characters}) => (
  <div className='character-list'>
    {characters?.length &&
      characters.map((character: Character) => (
        <Link href={`/characters/${character.id}`} key={character.id}>
          <CharacterCard
            id={character.id}
            name={character.name}
            imageSrc={character.image}
            description={character.description}
          />
        </Link>
      ))}
  </div>
);

export default CharacterList;
