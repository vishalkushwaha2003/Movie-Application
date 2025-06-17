import MovieCard from './MovieCard';
import { Skeleton } from '@mui/material';

const MovieGrid = ({ movies, lastMovieRef, loading }) => {
  const skeletonCount = 10;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie, index) => {
        if (index === movies.length - 1) {
          return (
            <div key={movie.imdbID} ref={lastMovieRef}>
              <MovieCard movie={movie} />
            </div>
          );
        }
        return (
          <MovieCard key={movie.imdbID} movie={movie} />
        );
      })}

      {loading &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={`skeleton-${i}`} className="w-full">
            <Skeleton variant="rectangular" width="100%" height={300} className="rounded-lg" />
            <Skeleton width="80%" height={20} className="mt-2" />
            <Skeleton width="60%" height={20} />
          </div>
        ))}
    </div>
  );
};

export default MovieGrid;
