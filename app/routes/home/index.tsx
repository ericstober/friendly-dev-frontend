import type { Route } from "./+types/index";
import type { Project, Post, StrapiResponse, StrapiProject, StrapiPost } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";

// meta function provides SEO metadata for the page
export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" }, // Page title
    { name: "description", content: "Custom website development" }, // Meta description
  ];
}

// leader function fetches data for the HomePage
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
  const url = new URL(request.url);

  // Fetch featured projects and latest posts in parallel
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`), // Featured projects
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`), // Latest posts sorted by date
  ]);

  // Throw error if either fetch fails
  if (!projectRes.ok || !postRes.ok) throw new Error("Failed to fetch projects or posts");

  // Parse JSON responses
  const projectJson: StrapiResponse<StrapiProject> = await projectRes.json();
  const postJson: StrapiResponse<StrapiPost> = await postRes.json();

  // Map Strapi projects to frontend-friendly Project type
  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  // Map Strapi posts to frontend-friendly Post type
  const posts = postJson.data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { projects, posts };
}

// HomePage component
// Renders the homepage with featured projects, an about preview, and latest blog posts
const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
      {/* Display a limited number of featured projects */}
      <FeaturedProjects projects={projects} count={2} />

      {/* Brief About section */}
      <AboutPreview />

      {/* Latest blog posts */}
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
