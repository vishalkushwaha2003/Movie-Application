import { 
    Paper, 
    Select, 
    MenuItem, 
    TextField, 
    FormControl, 
    InputLabel,
    Button,
  } from '@mui/material';
  import { MOVIE_TYPES, SORT_OPTIONS } from '@/utils/constants';
  
  const MovieFilters = ({ filters, onFilterChange, onReset }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: 100 }, 
      (_, i) => currentYear - i
    );
  
    return (
      <Paper className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => onFilterChange({ type: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={MOVIE_TYPES.MOVIE}>Movies</MenuItem>
              <MenuItem value={MOVIE_TYPES.SERIES}>Series</MenuItem>
              <MenuItem value={MOVIE_TYPES.EPISODE}>Episodes</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={filters.year}
              label="Year"
              onChange={(e) => onFilterChange({ year: e.target.value })}
            >
              <MenuItem value="">All Years</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sort}
              label="Sort By"
              onChange={(e) => onFilterChange({ sort: e.target.value })}
            >
              <MenuItem value={SORT_OPTIONS.YEAR_DESC}>Newest First</MenuItem>
              <MenuItem value={SORT_OPTIONS.YEAR_ASC}>Oldest First</MenuItem>
              <MenuItem value={SORT_OPTIONS.TITLE_ASC}>Title A-Z</MenuItem>
              <MenuItem value={SORT_OPTIONS.TITLE_DESC}>Title Z-A</MenuItem>
            </Select>
          </FormControl>
        </div>
  
        <div className="mt-4 flex justify-end">
          <Button onClick={onReset} variant="outlined" color="secondary">
            Reset Filters
          </Button>
        </div>
      </Paper>
    );
  };
  
  export default MovieFilters;