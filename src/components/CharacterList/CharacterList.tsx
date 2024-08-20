'use client';
import { Character } from '@character/domain/character';
import CharacterCard from '@components/CharacterCard';
import './character-list.styles.css';

interface Props {
  characters?: Array<Character>;
}

export const CharacterList: React.FC<Props> = ({characters}) => (
  <div className='character-list'>
    {characters?.length &&
      characters.map((character: Character) => (
        <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            imageSrc={character.image}
            description={character.description}
          />
      ))}
  </div>
);

export default CharacterList;
