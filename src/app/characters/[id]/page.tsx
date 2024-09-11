
import { notFound } from 'next/navigation';
import { diContainer } from "@modules/di.container";
import { CharacterFinder } from '@modules/character/application/character-find/character-find';
import { Character } from '@modules/character/domain/character';
import { Comic } from '@modules/character/domain/comic';
import { ComicsFinder } from '@modules/character/application/comics-finder/comics-finder';
import ComicsSection from '@components/ComicsSection';
import CharacterDetails from '@components/CharacterDetails';

export default async function CharacterDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const characterFinder: CharacterFinder = diContainer.getDependency('characterFinder');
  const comicsFinder: ComicsFinder = diContainer.getDependency('comicsFinder');
  const character: Character | null = await characterFinder.execute(id);
  const comics: Array<Comic> = await comicsFinder.execute(id);

  if (!character) {
    return notFound();
  }
  return (
    <main className='d-flex flex-d-column'>
        <CharacterDetails
          id={character.id}
          name={character.name}
          imageSrc={character.image}
          description={character.description}
        />
      {
        comics?.length && (
          <ComicsSection comics={comics}/>
        )
      }
    </main>
  );
}
