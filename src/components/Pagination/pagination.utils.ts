import { range } from "@utils/number";

const MAX_VISIBLE_PAGES = 5;

export const getPaginationItems = (totalPages: number, currentPage: number) => {
    const firstPage = 1;
    const lastPage = totalPages;
    const nearStart = currentPage < 3;
    const nearEnd = currentPage > totalPages - 3;
  
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return range(1, totalPages);
    }
  
    if (nearStart) {
      return [...range(1, MAX_VISIBLE_PAGES), 0, lastPage];
    }
  
    if (nearEnd) {
      return [firstPage, 0, ...range(totalPages - (MAX_VISIBLE_PAGES - 1), totalPages)];
    }
  
    return [firstPage, 0, currentPage - 1, currentPage, currentPage + 1, 0, lastPage];
  };