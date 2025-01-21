import React from 'react';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 border rounded-md m-1 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`${
            currentPage === index + 1 ? 'bg-brand-primary text-white' : ''
          } p-2 border rounded-md m-1`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 border rounded-md m-1 ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;
