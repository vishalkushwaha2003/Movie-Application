import { Skeleton } from '@mui/material';

const LoadingPlaceholder = () => {
  return (
    <div className="grid grid-cols-auto-fill-250 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="movie-card">
          <Skeleton variant="rectangular" height={350} />
          <div className="p-4">
            <Skeleton variant="text" height={24} width="80%" />
            <Skeleton variant="text" height={20} width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPlaceholder;