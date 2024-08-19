'use client'
import './search-box.styles.css'
import TextInput from "@components/TextInput";


interface Props {
    value: string;
    setSearchParam: (value: string) => void;
    total: number;
}

const SearchBox: React.FC<Props> = ({total, value, setSearchParam}) => {

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchParam(e.target.value)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <TextInput 
                data-testid='search-text-input'
                placeholder="search character..."
                value={value}
                onChange={handleOnChange}
             />
             <span className="search-box__results">{`${total} RESULTS`}</span>
        </form>
    )
}

export default SearchBox;