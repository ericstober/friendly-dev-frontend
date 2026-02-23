import { Outlet } from "react-router";
import type { Route } from "./+types/main";

// meta function provides SEO metadata for pages using this layout
export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev" }, // Page title
    { name: "description", content: "Custom website development" }, // Meta description
  ];
}

// MainLayout component
// Acts as a layout wrapper for pages that are not the homepage
// Provides consistent content width and spacing
const MainLayout = () => {
  return (
    <>
      {/* Main content area for nested routes */}
      <section className='max-w-6xl mx-auto px-6 my-8'>
        {/* Outlet renders child routes defined under this layout */}
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
