import CharacterListWrapper from "@components/CharacterListWrapper";
import { CharactersFinder } from "@modules/character/application/characters-finder/characters-finder";
import { diContainer } from "@modules/di.container";
import { redirect, RedirectType } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { searchTerm: string; page: number; perPage: number };
}) {
  const searchTerm = searchParams?.searchTerm || '';
  const initialPage = Number(searchParams?.page) || 1;
  const initialLimit = Number(searchParams?.perPage) || 50;

  if (!searchParams.page || !searchParams.perPage) {
    const params = new URLSearchParams();
    if (searchTerm) params.set('searchTerm', searchTerm);
    params.set('page', String(initialPage));
    params.set('perPage', String(initialLimit));

    redirect(`?${params.toString()}`, RedirectType.push);
  }
  const charactersFinder: CharactersFinder = diContainer.getDependency('charactersFinder');
  const { count, items } = await charactersFinder?.execute(searchTerm, initialPage, initialLimit);
  return (
    <main>
      <CharacterListWrapper 
        characters={items} 
        searchTerm={searchTerm}
        count={count}
        initialPage={initialPage}
        initialLimit={initialLimit}
      />
    </main>
  );
}
