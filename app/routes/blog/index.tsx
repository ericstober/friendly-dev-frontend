import { useState } from "react";
import type { Route } from "./+types";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

// Loader function to fetch posts from Strapi API
// This runs on the server (or during SSR/loader) before the component renders
export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  // Fetch posts from the API, including the image field and sorted by newest first
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`);

  // Throw an error if the request failed
  if (!res.ok) throw new Error("Failed to fetch data");

  // Parse the JSON response using the Strapi response type
  const json: StrapiResponse<StrapiPost> = await res.json();

  // Transform Strapi post data into the Post type used in the frontend
  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    // Provide a fallback image if none exists
    image: item.image?.url ? `${item.image.url}` : "images/no-image.png",
  }));

  return { posts };
}

// Main BlogPage component
// Accepts loaderData as a prop, which contains the posts fetched by the loader
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  // Local state for search input
  const [searchQuery, setSearchQuery] = useState("");
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Number of posts to show per page
  const postsPerPage = 10;

  // Destructure posts from loaderData
  const { posts } = loaderData;

  // Filter posts based on the search query (matches title or excerpt)
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
  });

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  // Calculate indices for slicing posts array for current page
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      {/* Page header */}
      <h2 className='text-3xl text-white font-bold mb-8'>Blog</h2>

      {/* Search/filter component */}
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      {/* List of posts */}
      <div className='space-y-8'>
        {currentPosts.length === 0 ? (
          <p className='text-gray-400 text-center'>No posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {/* Pagination controls, only show if more than 1 page */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
      )}
    </div>
  );
};

export default BlogPage;
