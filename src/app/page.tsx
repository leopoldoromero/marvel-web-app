import { CharactersFinder } from "@modules/character/application/characters-finder/characters-finder";
import { diContainer } from "@modules/di.container";

export default async function Home() {
  const charactersFinder: CharactersFinder = diContainer.getDependency('charactersFinder');
  const { count } = await charactersFinder?.execute();

  return (
    <main>
        <h1>Main page chracters count: {count}</h1>
    </main>
  );
}
