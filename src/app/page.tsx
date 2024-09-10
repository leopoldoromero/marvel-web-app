import PageLayout from "@components/PageLayout";
import { CharactersFinder } from "@modules/character/application/characters-finder/characters-finder";
import { diContainer } from "@modules/di.container";

export default async function Home() {
  const charactersFinder: CharactersFinder = diContainer.getDependency('charactersFinder');
  const { count, items } = await charactersFinder?.execute();

  return (
    <main>
        <PageLayout characters={items}/>
    </main>
  );
}
