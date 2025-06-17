import { useEffect, useState } from 'react';
import { fetchMovieById } from '@/services/api';
import MovieGrid from '../movie/MovieGrid';
import MovieCard from '../movie/MovieCard';
import { useFavorites } from '../../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites(); // Array of movie objects or imdbIDs
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      const movies = await Promise.all(
        favorites.map(async (movieObj) => {
          const id = typeof movieObj === 'string' ? movieObj : movieObj.imdbID;
          try {
            const movie = await fetchMovieById(id);
            return movie;
          } catch (error) {
            console.error(`Failed to fetch movie for ID ${id}:`, error);
            return null;
          }
        })
      );

      const uniqueMovies = Array.from(
        new Map(
          movies
            .filter(Boolean)
            .map((movie) => [movie.imdbID, movie])
        ).values()
      );

      setFavoriteMovies(uniqueMovies);
      setLoading(false);
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Your Favorites</h2>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((_, i) => (
            <MovieCard.Skeleton key={i} />
          ))}
        </div>
      ) : favoriteMovies.length === 0 ? (
        <p className="text-gray-400">No favorite movies yet. Add some!</p>
      ) : (
        <MovieGrid movies={favoriteMovies} />
      )}
    </div>
  );
};

export default Favorites;
