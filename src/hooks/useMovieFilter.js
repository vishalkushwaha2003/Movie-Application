import { useState } from 'react';
import { MOVIE_TYPES, SORT_OPTIONS } from '@/utils/constants';

export const useMovieFilters = () => {
  const [filters, setFilters] = useState({
    type: '',
    year: '',
    sort: SORT_OPTIONS.YEAR_DESC,
  });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      year: '',
      sort: SORT_OPTIONS.YEAR_DESC,
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};