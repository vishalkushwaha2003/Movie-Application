import { useParams } from 'react-router-dom';
import MovieDetail from '@/components/movie/MovieDetail';

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4">
      <MovieDetail movieId={id} />
    </div>
  );
};

export default MovieDetails;