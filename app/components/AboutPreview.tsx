import { Link } from "react-router";

// AboutPreview component
// Displays a short introduction section with profile image,
// brief description, and link to the full About page.
const AboutPreview = () => {
  return (
    <section className='mt-12 p-10 flex flex-col items-center gap-8 bg-gray-900 md:flex-row'>
      {/*
        Profile image
        - Rounded full avatar
        - Blue border for accent
        - Shadow for depth
        - Responsive layout handled by flex container
      */}
      <img
        src='/images/profile.jpg'
        alt='profile'
        className='w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md'
      />

      {/* Text content container */}
      <div>
        {/* Section title */}
        <h2 className='text-2xl font-bold text-white mb-2'>About Me</h2>

        {/* Short bio / preview text */}
        <p className='text-gray-200 mb-4 max-w-4xl'>
          I'm Eric - a developer passionate about building friendly digital experiences.
        </p>

        {/* Link to full About page */}
        <Link to='/about' className='inline-block text-blue-400 hover:underline text-sm'>
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
