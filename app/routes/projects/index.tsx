import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

// meta function provides SEO metadata for the Projects page
export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Projects" }, // Page title
    { name: "description", content: "My website project portfolio" }, // Meta description
  ];
}

// loader function fetches all projects from Strapi API
export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`);
  const json: StrapiResponse<StrapiProject> = await res.json();

  // Map Strapi response to frontend-friendly Project objects
  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }));

  return { projects };
}

// ProjectsPage component
// Renders the project portfolio with category filtering, pagination, and animation
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // currently selected category
  const [currentPage, setCurrentPage] = useState(1); // current pagination page
  const projectsPerPage = 10; // number of projects per page

  const { projects } = loaderData as { projects: Project[] };

  // Get unique project categories for filter buttons
  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get projects to display on the current page
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <section>
      {/* Page heading */}
      <h2 className='text-3xl text-white font-bold mb-8'>Projects</h2>

      {/* Category filter buttons */}
      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category); // update category filter
              setCurrentPage(1); // reset to first page
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Animated grid of project cards */}
      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination controls */}
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </section>
  );
};

export default ProjectsPage;
