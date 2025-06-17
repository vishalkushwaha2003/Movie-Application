import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-800 text-white mt-auto">
      <div className="container mx-auto text-center">
        <Typography variant="body2">
          © {new Date().getFullYear()} Movie Search App. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;