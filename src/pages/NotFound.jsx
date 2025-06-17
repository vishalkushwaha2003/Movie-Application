import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <Typography variant="h1" className="mb-4">
        404
      </Typography>
      <Typography variant="h4" className="mb-8">
        Page Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;