import CharacterListWrapper from "@components/CharacterListWrapper";
import { CharactersFinder } from "@modules/character/application/characters-finder/characters-finder";
import { diContainer } from "@modules/di.container";

export default async function Home({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) {
  const { searchTerm } = searchParams;
  const charactersFinder: CharactersFinder = diContainer.getDependency('charactersFinder');
  const { count, items } = await charactersFinder?.execute(searchTerm);
  console.log('COUNT....', count)

  return (
    <main>
        <CharacterListWrapper characters={items} searchTerm={searchTerm}/>
    </main>
  );
}
