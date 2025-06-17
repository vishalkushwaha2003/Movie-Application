import { useQuery } from 'react-query';
import { getLatestMovies, searchMovies } from '@/services/api';
import { useDebounce } from './useDebounce';

export const useMovies = (searchTerm = '', page = 1) => {
  const debouncedSearch = useDebounce(searchTerm, 500);

  const latestMoviesQuery = useQuery(
    ['latest-movies', page],
    () => getLatestMovies(page),
    {
      enabled: !debouncedSearch,
    }
  );

  const searchMoviesQuery = useQuery(
    ['search-movies', debouncedSearch, page],
    () => searchMovies(debouncedSearch, page),
    {
      enabled: Boolean(debouncedSearch),
    }
  );

  const isLoading = latestMoviesQuery.isLoading || searchMoviesQuery.isLoading;
  const error = latestMoviesQuery.error || searchMoviesQuery.error;
  const data = debouncedSearch ? searchMoviesQuery.data : latestMoviesQuery.data;

  return {
    movies: data?.results || [],
    totalPages: data?.total_pages || 0,
    isLoading,
    error,
  };
};