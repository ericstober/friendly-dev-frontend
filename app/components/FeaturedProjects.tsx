import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

// Props for FeaturedProjects component
type FeaturedProjectsProps = {
  projects: Project[]; // Array of projects to display
  count: number; // Number of featured projects to show (default: 2)
};

// Component to display a grid of featured projects
const FeaturedProjects = ({ projects, count = 2 }: FeaturedProjectsProps) => {
  // If there are no projects render nothing
  if (projects.length === 0) return null;

  return (
    <section>
      {/* Section heading */}
      <h2 className='text-2xl font-bold mb-6 text-gray-200'>Featured Projects</h2>

      {/* Responsive grid layout:
        - Single column on small screens
        - Two columns on small+ screens
      */}
      <div className='grid gap-6 sm:grid-cols-2'>
        {/*
          Render a ProjectCard for each project.
          The `key` helps React efficiently track list updates.

          NOTE: The `count` prop is currently not being used.
          If the intention is to limit the number of displayed projects,
          you may want to use:

          projects.slice(0, count).map(...)
        */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
