import type { Post } from "~/types";
import { Link } from "react-router";

// Props for LatestPosts component
type LatestPostsProps = {
  posts: Post[]; // Array of blog posts
  limit?: number; // Optional number of posts to display (default: 3)
};

// LatestPosts component
// Displays the most recent blog posts in a responsive grid layout.
const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  // Create a shallow copy of posts before sorting
  // This avoids mutating the original array passed via props.
  const sorted = [...posts].sort((a: Post, b: Post) => {
    // Sort posts by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Select only the most recent posts based on the limit
  const latest = sorted.slice(0, limit);

  return (
    <section className='max-w-6xl mx-auto px-6 py-12'>
      {/* Section heading */}
      <h2 className='text-2xl font-bold mb-6 text-white'>Latest Posts</h2>

      {/* Responsive grid:
        - 1 column by default
        - 2 columns on small screens
        - 3 columns on large screens
      */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {latest.map((post) => (
          // Each posts is wrapped in a Link for navigation
          <Link
            key={post.slug} // Unique key for React list rendering
            to={`/blog/${post.slug}`} // Dynamic route based on slug
            className='block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:shadow-md transition'
          >
            {/* Post title */}
            <h3 className='text-lg font-semibold text-blue-400 mb-1'>{post.title}</h3>

            {/* Post excerpt */}
            <p className='text-sm text-gray-300'>{post.excerpt}</p>

            {/* Formatted post date */}
            <span className='block mt-3 text-xs text-gray-400'>{new Date(post.date).toDateString()}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
