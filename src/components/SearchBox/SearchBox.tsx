'use client'
import './search-box.styles.css'
import TextInput from "@components/TextInput";
import { useEffect, useState } from "react";
import { useDebounce } from "hooks/use-debounce";

interface Props {
    total: number;
    setSearchParam: (value: string) => void;
    initialSearchValue?: string;
}

const SearchBox: React.FC<Props> = ({total, setSearchParam, initialSearchValue}) => {
    const [value, setValue] = useState<string>(initialSearchValue ?? '');
    const [debouncedSearch] = useDebounce(value);

    useEffect(() => {
        setSearchParam(debouncedSearch);
      }, [setSearchParam, debouncedSearch]);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value || '')
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <TextInput 
                placeholder="search character..."
                value={value}
                onChange={handleChange}
             />
             <span className="search-box__results">{`${total} RESULTS`}</span>
        </form>
    )
}

export default SearchBox;