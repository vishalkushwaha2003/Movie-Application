import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
} from '@mui/material';
import {
  Movie as MovieIcon,
  FavoriteBorder,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <AppBar 
        position="fixed" 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a1929]/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        elevation={scrolled ? 0 : 0}
      >
        <Toolbar className="flex justify-between w-full">
          {/* Left: Logo and Title */}
          <Link to="/" className="flex items-center text-white no-underline">
            <IconButton edge="start" color="inherit">
              <MovieIcon className="animate-pulse text-blue-400" />
            </IconButton>
            <Typography
              variant="h6"
              className="ml-2 font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            >
              Movie App
            </Typography>
          </Link>

          {/* Right: Favorites Icon */}
          <Box>
            <Link to="/favorites">
              <IconButton color="inherit">
                <FavoriteBorder className="text-red-400 hover:scale-110 transition-transform" />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rotate-12 animate-pulse">
          <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full -rotate-12 animate-pulse delay-1000">
          <div className="w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <Container maxWidth="xl" className="py-8">
          {children}
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 mt-auto">
        <Container>
          <Typography variant="body2" className="text-center text-gray-400">
            © {new Date().getFullYear()} Movie App. All rights reserved.
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
