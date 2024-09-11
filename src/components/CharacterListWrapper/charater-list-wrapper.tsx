import CharacterList from "@components/CharacterList";
import { Character } from "@modules/character/domain/character";
import './character-list-wrapper.styles.css'
import SearchBox from "@components/SearchBox";

interface Props {
    searchTerm: string;
    characters: Array<Character>;
    pageTitle?: string;
}

const CharacterListWrapper: React.FC<Props> = ({ pageTitle, characters, searchTerm}) =>  {
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
        </main>
    );
}

export default CharacterListWrapper;