import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardMedia, 
  Typography, 
  Chip, 
  IconButton,
  Skeleton,
  Button
} from '@mui/material';
import {
  ArrowBack,
  Star,
  AccessTime,
  CalendarMonth,
  Language,
  LocalMovies,
  Grade
} from '@mui/icons-material';
import { getMovieDetails } from '../../services/api';

// Skeleton component for loading state
const MovieDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Button
      startIcon={<ArrowBack />}
      className="mb-6 text-white/80 hover:text-white"
      disabled
    >
      Back to Movies
    </Button>
    
    <Card className="bg-[#0f1729]/40 backdrop-blur-sm border border-white/5 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {/* Poster Skeleton */}
        <Skeleton 
          variant="rectangular" 
          className="aspect-[2/3] rounded-lg"
          animation="wave"
        />

        {/* Details Skeleton */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <Skeleton variant="text" height={60} width="80%" />
            <div className="flex gap-2 mt-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} variant="rounded" width={80} height={32} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} variant="rounded" height={60} />
            ))}
          </div>

          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton variant="text" width="30%" height={40} />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="100%" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <MovieDetailSkeleton />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          className="mb-6 text-white/80 hover:text-white"
        >
          Back to Movies
        </Button>
        <Card className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-8 text-center">
          <Typography className="text-red-400 text-lg">{error}</Typography>
        </Card>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        className="mb-6 text-white/80 hover:text-white transform transition-all duration-300 hover:scale-105"
      >
        Back to Movies
      </Button>

      <Card className="bg-[#0f1729]/40 backdrop-blur-sm border border-white/5 overflow-hidden
        transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          {/* Poster with shimmer effect */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
              group-hover:opacity-50 transition-opacity duration-500" />
            <CardMedia
              component="img"
              image={movie.Poster}
              alt={movie.Title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <Typography variant="h3" className="text-white font-bold mb-2 
                bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {movie.Title}
              </Typography>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.Genre.split(',').map((genre) => (
                  <Chip
                    key={genre}
                    label={genre.trim()}
                    className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 
                      transition-colors duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                icon={<Star className="text-yellow-400" />}
                label="IMDb"
                value={`${movie.imdbRating}/10`}
              />
              <StatCard
                icon={<AccessTime className="text-blue-400" />}
                label="Runtime"
                value={movie.Runtime}
              />
              <StatCard
                icon={<CalendarMonth className="text-green-400" />}
                label="Year"
                value={movie.Year}
              />
              <StatCard
                icon={<Language className="text-purple-400" />}
                label="Language"
                value={movie.Language}
              />
            </div>

            {/* Content Sections */}
            <ContentSection title="Plot" content={movie.Plot} />
            <ContentSection title="Cast" content={movie.Actors} />
            <ContentSection title="Director" content={movie.Director} />
            <ContentSection title="Writer" content={movie.Writer} />
            {movie.Awards !== "N/A" && (
              <ContentSection 
                title="Awards" 
                content={movie.Awards}
                icon={<Grade className="text-yellow-400" />}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper components for better organization
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm
    transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <Typography className="text-sm text-gray-400">{label}</Typography>
        <Typography className="font-bold text-white">{value}</Typography>
      </div>
    </div>
  </div>
);

const ContentSection = ({ title, content, icon }) => (
  <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm
    transform transition-all duration-300 hover:bg-white/10">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <Typography variant="h6" className="text-white/90">
        {title}
      </Typography>
    </div>
    <Typography className="text-gray-300">
      {content}
    </Typography>
  </div>
);

export default MovieDetail;