import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites((prev) => prev.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.imdbID === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
