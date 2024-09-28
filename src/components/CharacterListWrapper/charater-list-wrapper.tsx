'use client';
import CharacterList from "@components/CharacterList";
import { Character } from "@modules/character/domain/character";
import './character-list-wrapper.styles.css'
import SearchBox from "@components/SearchBox";
import Pagination from "@components/Pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    searchTerm: string;
    characters: Array<Character>;
    pageTitle?: string;
    count: number;
    initialPage: number;
    initialLimit: number;
}

const CharacterListWrapper: React.FC<Props> = ({ pageTitle, characters, searchTerm, initialPage, count, initialLimit}) =>  {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const router = useRouter()
    const handlePageChange = (page: number) => {
        if (currentPage !== page) {
            setCurrentPage(page);
            const params = new URLSearchParams(window.location.search);
            params.set("page", String(page));
            router.push(`?${params.toString()}`, {scroll: true});
        } 
    }
    const totalPages = count <= initialLimit ? 1 : Math.round(count / initialLimit);

    return (
        <main className='page-layout'>
            {pageTitle && (
                <div className="page-title-wrapper">
                    <h2 className='page-title-wrapper__title'>{pageTitle}</h2>
                </div>
            )}
            <SearchBox 
               initialValue={searchTerm} 
               total={characters?.length}
           />
           <div className="p-relative">
            <CharacterList characters={characters} />
           </div>
           {
            count > 0 && totalPages > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
                </div>
            )
           }
        </main>
    );
}

export default CharacterListWrapper;