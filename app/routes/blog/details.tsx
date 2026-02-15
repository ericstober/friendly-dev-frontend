import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import { Link } from "react-router";

// Loader function to fetch a single blog post by slug
// Runs server-side before rendering the component
export async function loader({ request, params }: Route.LoaderArgs) {
  // Get the post slug from route parama
  const { slug } = params;

  // Fetch the post from the Strapi API with the specified slug
  // Include the image field in the response
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`);

  // Throw error if the API request fails
  if (!res.ok) throw new Error("Failed to fetch data");

  // Parse the response as StrapiResponse type
  const json: StrapiResponse<StrapiPost> = await res.json();

  // If no post is found, throw a 404 response
  if (!json.data.length) throw new Response("Not Found", { status: 404 });

  // Extract the first (and only) post from the response
  const item = json.data[0];

  // Map the Strapi post object to the frontend Post type
  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  // Return post to the component as loaderData
  return { post };
}

// Props type for the BlogPostDetailsPage component
type BlogPostDetailsPageProps = {
  loaderData: {
    // Single post fetch from loader
    post: Post;
  };
};

// Blog post details page component
const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  // Destructure the post
  const { post } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      {/* Post title */}
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>

      {/* Post date */}
      <p className='text-sm text-gray-400 mb-6'>{new Date(post.date).toDateString()}</p>

      {/* Post featured image */}
      <img src={post.image} alt={post.title} className='w-full h-64 object-cover mb-4' />

      {/* Post body rendered as Markdown */}
      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      {/* Link back to blog post list */}
      <Link
        to='/blog'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
