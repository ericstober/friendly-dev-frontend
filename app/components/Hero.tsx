import { Link } from "react-router";

// Props for the Hero component
type HeroProps = {
  name?: string;
  text?: string;
};

// Hero component
// Displays a prominent intruductory section (typically used on a homepage)
// Includes a heading, short description, and call-to-action buttons.
const Hero = ({
  // Default values ensure the component still renders meaningfully even if no props are provided.
  name = "[NAME]",
  text = "I build friendly web experiences and help others become confident, modern developers.",
}) => {
  return (
    <header className='text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300'>
      {/* Main heading */}
      <h2 className='text-4xl font-bold mb-4'>Hey, I'm {name}</h2>

      {/* Supporting description text */}
      <p className='text-lg text-gray-300 max-w-2xl mx-auto mb-6'>{text}</p>

      {/* Call-to-action buttons */}
      <div className='flex justify-center gap-4'>
        {/* Primary CTA - Projects */}
        <Link to='/projects' className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'>
          View Projects
        </Link>

        {/* Secondary CTA - Contact */}
        <Link
          to='/contact'
          className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
