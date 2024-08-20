import CharacterList from "@components/CharacterList";
import CustomCircularProgress from "@components/CircularLoader/CircularLoader";
import SearchBox from "@components/SearchBox";
import { useDebounce } from "@hooks/use-debounce";
import { Character } from "@modules/character/domain/character";
import { useEffect, useState } from "react";
import './page-layout.styles.css'

interface Props {
    pageTitle?: string;
    fetchCharacters: (debouncedSearchParam?: string, page?: number, perPage?: number) => Promise<Character[]>;
}

const PageLayout: React.FC<Props> = ({ pageTitle, fetchCharacters}) =>  {
    const [searchParam, setSearchParam] = useState('');
    const [debouncedSearchParam] = useDebounce(searchParam);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedCharacters = await fetchCharacters(debouncedSearchParam);
            setCharacters(fetchedCharacters);
            setIsLoading(false);
        };
        fetchData();
    }, [debouncedSearchParam, fetchCharacters]);

    if (isLoading) return (<CustomCircularProgress />)

    return (
        <main className='page-layout'>
            {pageTitle && (
                <div className="page-title-wrapper">
                    <h2 className='page-title-wrapper__title'>{pageTitle}</h2>
                </div>
            )}
           <SearchBox 
               value={searchParam} 
               setSearchParam={setSearchParam} 
               total={characters?.length}
           />
           <div className="p-relative">
            <CharacterList characters={characters} />
           </div>
        </main>
    );
}

export default PageLayout;