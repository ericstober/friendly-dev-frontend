import type { Project } from "~/types";
import { Link } from "react-router";

// ProjectCard component
// Displays a clickable project preview card the links to a detailed project page.
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    // Wrap entire card in a Link to make the full card clickable
    <Link
      className='block transform transition duration-300 hover:scale-[1.02]'
      to={`/projects/${project.documentId}`} // Dynamic route using project ID
    >
      <div className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md'>
        {/* Project featured image */}
        <img src={project.image} alt={project.title} className='w-full h-40 object-cover' />

        {/* Card content */}
        <div className='p-5'>
          {/* Project title */}
          <h3 className='text-3xl font-semibold text-blue-400 mb-1'>{project.title}</h3>

          {/* Short project description */}
          <p className='text-sm text-gray-300 mb-2'>{project.description}</p>

          {/* Footer metadata (category + formatted date) */}
          <div className='flex justify-between items-center text-sm text-gray-400'>
            <span>{project.category}</span>

            {/* Format date for readability */}
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
