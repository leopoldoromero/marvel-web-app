import CharacterListWrapper from "@components/CharacterListWrapper";
import { CharacterFinder } from "@modules/character/application/character-find/character-find";
import { diContainer } from "@modules/di.container";
import { cookies } from "next/headers";

export default async function Favorites({
  searchParams,
}: {
  searchParams: { searchTerm: string };
}) {
  const cookieStore = cookies();
  const favoritesCookie = cookieStore.get("favorites");
  const favoritesIds: Array<number> = favoritesCookie?.value?.split(",")
    .map((id) => parseInt(id)) ?? [];
  const characterFinder: CharacterFinder = diContainer.getDependency('characterFinder');

  const nameStartsWith = searchParams.searchTerm ?? '';
  const characters = await Promise.all(favoritesIds?.map((id ) => characterFinder.execute(id)))
  const items = characters?.filter((el) => !!el)?.filter((item) => nameStartsWith ? item?.name?.toLowerCase().startsWith(nameStartsWith.toLowerCase()) : item)


  return (
    <main>
      <CharacterListWrapper characters={items} searchTerm={nameStartsWith}/>
    </main>
  );
}
