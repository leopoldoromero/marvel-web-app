export const range = (start: number, end: number): Array<number> => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};
  