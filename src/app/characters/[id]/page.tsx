import { Character } from '@character/domain/character';
import { Comic } from '@character/domain/comic';
import CharacterResume from '@components/CharacterResume';
import ComicsSection from '@components/ComicsSection';
import { characterFinder, comicsFinder } from 'modules/di.container';
import { notFound } from 'next/navigation';

export default async function CharacterDetails({
  params,
}: {
  params: { id: number };
}) {
  // const character = {
  //   id: 1011334,
  //   name: 'A-Bomb (HAS)',
  //   description:
  //     "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
  //   image: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg',
  //   comics: [],
  // };
  const { id } = params;
  const character: Character | null = await characterFinder.execute(id);
  const comics: Array<Comic> = await comicsFinder.execute(id)
  if (!character) {
    return notFound();
  }
  return (
    <main className='d-flex flex-d-column'>
      {/* <Suspense fallback={<Loading/>}>   */}
        <CharacterResume
          id={character.id}
          name={character.name}
          imageSrc={character.image}
          description={character.description}
        />
      {/* </Suspense> */}
      {
        comics?.length && (
          <ComicsSection comics={comics}/>
        )
      }
    </main>
  );
}
