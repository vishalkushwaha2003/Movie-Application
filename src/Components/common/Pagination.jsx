import { Pagination as MUIPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center py-8">
      <MUIPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        size="large"
        className="bg-[#0f1729]/40 backdrop-blur-sm px-4 py-2 rounded-full
          border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          },
          '& .Mui-selected': {
            backgroundColor: 'rgba(33, 150, 243, 0.3) !important'
          }
        }}
      />
    </div>
  );
};

export default Pagination;