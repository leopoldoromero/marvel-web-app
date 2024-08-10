import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500): [T, Dispatch<SetStateAction<T>>] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
};