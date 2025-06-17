import { useState, useEffect } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect to handle debounced search
  useEffect(() => {
    // Only search if we have a search term
    if (debouncedSearchTerm !== undefined) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); // Immediate search clear without debounce
  };

  return (
    <Paper
      component="form"
      className="flex items-center w-full max-w-2xl mx-auto p-2 
        bg-[#0f1729]/40 backdrop-blur-sm border border-white/5
        hover:border-white/10 transition-all duration-300
        focus-within:border-blue-500/50 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      sx={{
        borderRadius: '9999px',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchTerm); // Immediate search on form submit
      }}
    >
      <div className="flex items-center mx-2 text-gray-400">
        {debouncedSearchTerm !== searchTerm ? (
          // Show loading indicator when debouncing
          <div className="w-5 h-5 animate-spin rounded-full 
            border-2 border-gray-400 border-t-transparent" />
        ) : (
          <SearchIcon />
        )}
      </div>
      
      <InputBase
        className="ml-1 flex-1 text-white"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{
          '& input::placeholder': {
            color: 'rgb(156 163 175)',
            opacity: 1,
          },
          '& input': {
            transition: 'all 0.3s ease',
          },
        }}
      />
      
      {searchTerm && (
        <IconButton 
          size="small" 
          onClick={handleClear}
          className="text-gray-400 hover:text-white
            transform transition-all duration-300 hover:scale-110"
        >
          <ClearIcon />
        </IconButton>
      )}

      {/* Visual indicator that search is being debounced */}
      {debouncedSearchTerm !== searchTerm && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5">
          <div className="h-full bg-blue-500/50 animate-pulse rounded-full" />
        </div>
      )}
    </Paper>
  );
};

export default SearchBar;