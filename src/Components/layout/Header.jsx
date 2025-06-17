import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Button,
  Popover,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from '@mui/material';
import { Movie as MovieIcon, Favorite, Home, Close } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

const Header = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isFavorites = location.pathname === '/favorites';
  
  // Popover state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFavoritesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    handleClose();
  };

  return (
    <AppBar 
      position="sticky" 
      className="bg-[#0f1729]/80 backdrop-blur-sm border-b border-white/5"
    >
      <Toolbar className="container mx-auto px-4 flex justify-between">
        <Link to="/" className="flex items-center text-white no-underline">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MovieIcon />
          </IconButton>
          <Typography variant="h6" className="ml-2 font-bold">
            Movie App
          </Typography>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            className={`transform transition-all duration-300 hover:scale-105 
              ${isHome ? 'text-blue-400' : 'text-white/70'}`}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            startIcon={
              <Badge badgeContent={favorites.length} color="error">
                <Favorite />
              </Badge>
            }
            onClick={handleFavoritesClick}
            className={`transform transition-all duration-300 hover:scale-105
              ${isFavorites ? 'text-blue-400' : 'text-white/70'}`}
          >
            Favorites
          </Button>
        </div>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            className: "bg-[#0f1729]/95 backdrop-blur-lg border border-white/10 mt-2 rounded-xl",
            style: { maxHeight: '70vh', width: '320px' }
          }}
        >
          <Box className="p-4">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="text-white/90 font-bold">
                Favorite Movies ({favorites.length})
              </Typography>
              <IconButton size="small" onClick={handleClose} className="text-white/70">
                <Close />
              </IconButton>
            </div>

            {favorites.length === 0 ? (
              <Typography className="text-white/50 text-center py-4">
                No favorite movies yet
              </Typography>
            ) : (
              <List className="divide-y divide-white/10">
                {favorites.map((movie) => (
                  <ListItem 
                    key={movie.imdbID}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleMovieClick(movie.imdbID)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-12 h-16 rounded-lg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography className="text-white/90 font-medium line-clamp-1">
                          {movie.Title}
                        </Typography>
                      }
                      secondary={
                        <Typography className="text-white/50 text-sm">
                          {movie.Year}
                        </Typography>
                      }
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie);
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Favorite fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}

            {favorites.length > 0 && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/favorites');
                  handleClose();
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-600"
              >
                View All Favorites
              </Button>
            )}
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;