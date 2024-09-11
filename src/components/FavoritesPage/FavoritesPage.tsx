'use client'
import { useFavoritesContext } from "@contexts/FavoritesContext"
import { characterFinder } from "@modules/di.container"
import { useCallback } from "react"
import './favorites-page.styles.css';
import PageLayout from "@components/PageLayout"


const FavoritesPage = () => {
    const { favorites } = useFavoritesContext();

    const fetchCharacters = useCallback(async (nameStartsWith?: string, page?: number, perPage?: number) => {
        const characters = await Promise.all(favorites?.map((id ) => characterFinder.execute(id)))
        return characters?.filter((el) => !!el)?.filter((item) => nameStartsWith ? item?.name?.toLowerCase().startsWith(nameStartsWith.toLowerCase()) : item)
    }, [favorites]);
    return (
        <PageLayout fetchCharacters={fetchCharacters}/>
    );
};

export default FavoritesPage;