'use client'
import PageLayout from "@components/PageLayout"
import { charactersFinder } from "@modules/di.container"
import { useCallback } from "react"

const HomePage = () => {
    const fetchCharacters = useCallback(async (nameStartsWith?: string, page?: number, perPage?: number) => {
          return charactersFinder.execute(nameStartsWith, page, perPage);
      }, [])
    return (
        <PageLayout fetchCharacters={fetchCharacters}/>
    );
};

export default HomePage;