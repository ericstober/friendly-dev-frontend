// Props for PostFilter component
type PostFilterProps = {
  searchQuery: string; // Current search input value
  onSearchChange: (value: string) => void; // Callback triggered when input changes
};

// PostFilter component
// Provides a controlled input field for filtering blog posts.
// The parent component manages the search state.
const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className='mb-6 '>
      {/*
        Controlled input:
        - value is driven by searchQuery prop
        - onChange calls parent handler to update state
      */}
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Search Posts...'
        className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
};

export default PostFilter;
