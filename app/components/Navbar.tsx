import { useState } from "react";
import { NavLink } from "react-router";
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";

// Navbar component
// Provides responsive navigation with desktop links and a collapsible mobile hamburger menu.
const Navbar = () => {
  // Controls whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Base class for inactive navigation links
  const base = "transition hover:text-blue-400";

  // Class for active navigation link (current route)
  const active = "text-blue-400 font-semibold";

  return (
    <nav className='bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50'>
      {/* Main navbar container */}
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo / Brand Section */}
        <NavLink to='/' className='flex items-center gap-2 text-lg font-bold text-blue-300'>
          {/* Brand icon */}
          <FaLaptopCode className='text-blue-400 text-xl' />
          <span>The Friendly Developer</span>
        </NavLink>

        {/* Desktop Navigation */}
        {/* Hidden on small screens */}
        <div className='hidden md:flex items-center gap-6'>
          <div className='space-x-4 text-sm text-gray-300'>
            {/* NavLink automatically receives isActive from React Router */}
            <NavLink className={({ isActive }) => (isActive ? active : base)} to='/'>
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to='/projects'>
              Projects
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to='/blog'>
              Blog
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to='/about'>
              About
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to='/contact'>
              Contact
            </NavLink>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        {/* Visible only on small screens */}
        <div className='md:hidden flex items-center gap-4'>
          <button
            onClick={() => setMenuOpen(!menuOpen)} // Toggle mobile menu
            className='text-blue-400 text-xl cursor-pointer'
            title='Menu'
          >
            {/* Show close incon if menu is open, otherwise show hamburger */}
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {/* Conditionally rendered */}
      {menuOpen && (
        <div className='md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center'>
          {/* Each link closes the menu after navigation */}
          <NavLink className={({ isActive }) => (isActive ? active : base)} to='/' onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/projects'
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/blog'
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/about'
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/contact'
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
