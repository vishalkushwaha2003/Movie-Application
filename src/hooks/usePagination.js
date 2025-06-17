import { useState } from 'react';
import { ITEMS_PER_PAGE } from '@/utils/constants';

export const usePagination = (totalItems) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (pageNumber) => {
    setPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return {
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};