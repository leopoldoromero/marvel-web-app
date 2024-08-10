'use client'
import CharacterList from "@components/CharacterList"
import CustomCircularProgress from "@components/CircularLoader/CircularLoader"
import SearchBox from "@components/SearchBox"
import { useCharacterContext } from "@contexts/CharacterContext"
import { useEffect, useState } from "react"

const HomeLayout = () => {
    const [searchParam, setSearchParam] = useState('');
    const { characters, isLoading, getCharacters } = useCharacterContext()

    useEffect(() => {
        (() => {
            getCharacters(searchParam);
          })();
          return () => {};
      }, [searchParam]);
    return (
        <main className='d-flex flex-d-column gap-xl p-top-3 p-bottom-3'>
           <SearchBox total={characters?.length} setSearchParam={setSearchParam}/>
           <div className="p-relative">
            {
                isLoading ? (
                    <CustomCircularProgress />
                ) : <CharacterList characters={characters} />
            }
           </div>
        </main>
    );
};

export default HomeLayout;