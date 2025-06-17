import { useState, useEffect, useRef, useCallback } from 'react';
import { searchMovies, getRandomMovies } from '../services/api';
import SearchBar from '../Components/common/SearchBar';
import MovieGrid from '../Components/movie/MovieGrid';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchMovies = async (query, pageNum) => {
    try {
      setLoading(true);
      setError(null);

      const result = query
        ? await searchMovies(query, pageNum)
        : await getRandomMovies();

      if (result.error) {
        setError(result.error);
        return;
      }

      setMovies((prev) => [...prev, ...result.movies]);
      setHasMore(result.movies.length > 0);
    } catch (err) {
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies(searchQuery, page);
  }, [page, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white/90">
        {searchQuery ? `Results for "${searchQuery}"` : 'Popular Movies'}
      </h2>

      <MovieGrid movies={movies} lastMovieRef={lastMovieRef} />

      {loading && (
        <div className="flex justify-center py-4">
          <CircularProgress />
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Home;
