// Props for the Pagination component
type PaginationProps = {
  totalPages: number; // Total number of pages available
  currentPage: number; // Currently selected/active page
  onPageChange: (page: number) => void; // Callback function triggered when a page is clicked
};

// Pagination component
// Renders numbered page buttons based on totalPages.
// Highlights the current page and calls onPageChange when a new page is selected.
const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // If there is only one page (or none), don't render pagination controls
  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center gap-2 mt-8'>
      {/* Create an array of length totalPages and map over it to render numbered buttons. idx starts at 0, so we add 1 for human-friendly page numbers.*/}
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1} // Unique key for each page button
          className={`px-3 py-1 cursor-pointer rounded ${
            // Highlight active page
            currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
          }`}
          // When clicked, notify parent component of page change
          onClick={() => onPageChange(idx + 1)}
        >
          {/* Display page number */}
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
