import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

// Define the application's route configuration
export default [
  // Home layout route
  // Uses the HomeLayout component for the root path and renders the home page index
  layout("./routes/layouts/home.tsx", [index("routes/home/index.tsx")]),

  // Main layout route
  // Uses the MainLayout component for all other pages
  layout("./routes/layouts/main.tsx", [
    // About page route
    route("about", "./routes/about/index.tsx"),

    // Contact page route
    route("contact", "./routes/contact/index.tsx"),

    // Projects listing page
    route("projects", "./routes/projects/index.tsx"),

    // Individual project details page (dynamic route with :id param)
    route("projects/:id", "./routes/projects/details.tsx"),

    // Blog listing page
    route("blog", "./routes/blog/index.tsx"),

    // Individual blog post page (dynamic route with :slug param)
    route("blog/:slug", "./routes/blog/details.tsx"),

    // Catch-all route for unmatched paths (404 Not Found)
    route("*", "./routes/errors/not-found.tsx"),
  ]),
] satisfies RouteConfig; // Ensures TypeScript validates the shape of the routes
