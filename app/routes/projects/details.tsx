import type { Route } from "./+types/details";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

// loader function fetches project data based on the documentId from params
export async function loader({ request, params }: Route.LoaderArgs) {
  const { id } = params; // extract project ID from route parameters

  // Fetch project data from Strapi API using a filter for documentId
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`);

  // Throw a 404 response if the project is not found
  if (!res.ok) throw new Response("Project not found", { status: 404 });

  // Parse response JSON
  const json: StrapiResponse<StrapiProject> = await res.json();

  const item = json.data[0]; // take the first (and only) matching project

  // Map Strapi project to frontend-friendly Project type
  const project: Project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  };

  return { project };
}

// ProjectDetailsPage component
// Renders detailed information for a single project
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
  return (
    <>
      {/* Back link to Projects list */}
      <Link to='/projects' className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'>
        <FaArrowLeft className='mr-2' /> Back To Projects
      </Link>

      {/* Main content grid */}
      <div className='grid md:grid-cols-2 gap-8 items-start'>
        {/* Project image */}
        <div>
          <img src={project.image} alt={project.title} className='w-full rounded-lg shadow-md' />
        </div>

        {/* Project details */}
        <div>
          {/* Project title */}
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>{project.title}</h1>

          {/* Date and category metadata */}
          <p className='text-gray-300 text-sm mb-4'>
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>

          {/* Project description */}
          <p className='text-gray-200 mb-6'>{project.description}</p>

          {/* Link to live project site */}
          <a
            href={project.url}
            target='_blank'
            className='inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transiton'
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
