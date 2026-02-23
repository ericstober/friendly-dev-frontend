import { Outlet } from "react-router";
import Hero from "~/components/Hero";

// HomeLayout component
// Provides the layout for the home page and nested routes.
// Renders a Hero section at the top and an Outlet for nested content.
const HomeLayout = () => {
  return (
    <>
      {/* Hero section at the top of the homepage */}
      <Hero name='Eric' />

      {/* Main content area for nested routes */}
      <section className='max-w-6xl mx-auto px-6 my-8'>
        {/* Outlet renders child routes defined under this layout */}
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
