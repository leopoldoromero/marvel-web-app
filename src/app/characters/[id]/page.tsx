
// import { notFound } from 'next/navigation';

import { CharactersFinder } from "@modules/character/application/characters-finder/characters-finder";
import { diContainer } from "@modules/di.container";

export default async function CharacterDetails({
  params,
}: {
  params: { id: number };
}) {
  // if (!character) {
  //   return notFound();
  // }
  const charactersFinder: CharactersFinder = diContainer.getDependency('charactersFinder');
  const { items } = await charactersFinder?.execute();
  const name = items[0].name;
  return (
    <main className='d-flex flex-d-column'>
      <h1>Character Details</h1>
      <span>name: {name}</span>
      <span>id: {params?.id}</span>
    </main>
  );
}
