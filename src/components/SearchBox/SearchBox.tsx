'use client'
import { useEffect, useState } from 'react';
import './search-box.styles.css'
import TextInput from "@components/TextInput";
import { useDebounce } from '@hooks/use-debounce';
import { useRouter } from 'next/navigation';

interface Props {
    initialValue: string;
    total: number;
}

const SearchBox: React.FC<Props> = ({total, initialValue = ''}) => {
    const [searchParam, setSearchParam] = useState(initialValue);
    const [debouncedSearchParam] = useDebounce(searchParam);
    const router = useRouter()

    useEffect(() => {
        if (debouncedSearchParam !== initialValue) {
            const params = new URLSearchParams(window.location.search);
            if (debouncedSearchParam === '') {
                params.delete('searchTerm')
            } else {
                params.set("searchTerm", debouncedSearchParam);
            }
            router.push(`?${params.toString()}`);
        } 
    }, [debouncedSearchParam, router, initialValue]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchParam(e.target.value)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <TextInput 
                data-testid='search-text-input'
                placeholder="search character..."
                value={searchParam}
                onChange={handleOnChange}
             />
             <span className="search-box__results">{`${total} RESULTS`}</span>
        </form>
    )
}

export default SearchBox;