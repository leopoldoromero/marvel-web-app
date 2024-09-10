import CharacterList from "@components/CharacterList";
import { Character } from "@modules/character/domain/character";
import './page-layout.styles.css'

interface Props {
    characters: Array<Character>;
    pageTitle?: string;
}

const PageLayout: React.FC<Props> = ({ pageTitle, characters}) =>  {
    return (
        <main className='page-layout'>
            {pageTitle && (
                <div className="page-title-wrapper">
                    <h2 className='page-title-wrapper__title'>{pageTitle}</h2>
                </div>
            )}
           <div className="p-relative">
            <CharacterList characters={characters} />
           </div>
        </main>
    );
}

export default PageLayout;