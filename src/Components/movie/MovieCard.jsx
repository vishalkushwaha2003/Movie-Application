import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Chip, Skeleton } from '@mui/material';
import { Favorite, FavoriteBorder, Star, PlayCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { getImageUrl } from '@/services/api';

const MovieCard = ({ movie }) => {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const isFav = isFavorite(movie.imdbID);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <Card 
        className="relative group h-full flex flex-col
          bg-[#0f1729]/40 backdrop-blur-sm border border-white/5
          transform transition-all duration-500 ease-out
          hover:scale-[1.02] hover:-translate-y-1
          rounded-[20px] hover:rounded-[24px]
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          hover:shadow-[0_0_25px_rgba(33,150,243,0.4)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/movie/${movie.imdbID}`} className="block relative aspect-[16/9]">
          {/* Blurred placeholder */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-2xl scale-110 rounded-t-[20px]"
            style={{
              backgroundImage: `url(${getImageUrl(movie.Poster)})`,
              opacity: imageLoaded ? 0 : 0.5,
              transition: 'all 0.7s ease-in-out'
            }}
          />
          
          {/* Main image with lazy loading */}
          <img
            src={getImageUrl(movie.Poster)}
            alt={movie.Title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover rounded-t-[20px]
              transition-all duration-700 ease-out object-center
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              ${isHovered ? 'brightness-75' : 'brightness-90'}`}
          />
  
          {/* Gradient overlays */}
          <div className={`absolute inset-0 rounded-t-[20px] transition-opacity duration-500
            bg-gradient-to-t from-black/90 via-black/30 to-transparent
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Play button overlay */}
          <div className={`absolute inset-0 flex items-center justify-center
            transition-all duration-500 transform
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <PlayCircle className="text-white/90 w-14 h-14 hover:text-primary-light transition-colors" />
          </div>
        </Link>
  
        <CardContent className="relative flex-grow bg-[#0f1729]/60 backdrop-blur-xl p-4 rounded-b-[20px]">
          {/* Favorite button */}
          <IconButton
            className={`absolute -top-6 right-4 w-10 h-10
              bg-black/30 backdrop-blur-xl hover:bg-black/50
              shadow-lg border border-white/10
              transform transition-all duration-500 ease-out
              ${isHovered ? '-translate-y-1 scale-110' : 'translate-y-0 scale-100'}`}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(movie); // pass the full movie object
              }}
            size="small"
          >
            {isFav ? (
              <Favorite sx={{
                color: '#ef4444',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            ) : (
              <FavoriteBorder sx={{
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  color: '#ffffff'
                }
              }} />
            )}
          </IconButton>
  
          <div className="flex justify-between items-start gap-2">
            <div className="flex-grow">
              {/* Title */}
              <Typography 
                variant="h6" 
                className="font-bold text-base line-clamp-1 mb-2
                  bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent
                  group-hover:from-blue-300 group-hover:to-purple-300
                  transition-all duration-500"
                title={movie.Title}
              >
                {movie.Title}
              </Typography>
  
              {/* Year and Rating in one line */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{movie.Year}</span>
                {movie.imdbRating && (
                  <div className="flex items-center gap-1 text-yellow-400/90">
                    <Star fontSize="small" />
                    <span>{movie.imdbRating}</span>
                  </div>
                )}
              </div>
            </div>
  
            {/* Genre badge */}
            {movie.Genre && (
              <Chip
                label={movie.Genre.split(',')[0]}
                size="small"
                className="bg-blue-500/20 text-blue-300 text-xs"
              />
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  

// Skeleton loader component
MovieCard.Skeleton = function MovieCardSkeleton() {
    return (
      <Card className="relative h-full
        bg-[#0f1729]/40 backdrop-blur-sm border border-white/5
        rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="aspect-[16/9] relative overflow-hidden rounded-t-[20px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
            animate-[shimmer_2s_infinite]" style={{ transform: 'translateX(-100%)' }} />
        </div>
        <CardContent className="relative p-4 bg-[#0f1729]/60">
          <Skeleton 
            variant="text" 
            width="80%" 
            height={24}
            className="bg-white/5 mb-2"
          />
          <div className="flex items-center gap-2">
            <Skeleton 
              variant="text" 
              width={40} 
              height={20} 
              className="bg-white/5"
            />
            <Skeleton 
              variant="text" 
              width={40} 
              height={20} 
              className="bg-white/5"
            />
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default MovieCard;