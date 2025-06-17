import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';

export const useMovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await searchMovies(searchTerm, page);

        if (result.error) {
          setError(result.error);
          setMovies([]);
        } else {
          setMovies(result.movies);
          setTotalPages(result.totalPages);
        }
      } catch (err) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return {
    movies,
    loading,
    error,
    searchTerm,
    page,
    totalPages,
    handleSearch,
    handlePageChange
  };
};