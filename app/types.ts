// Frontend-friendly Project type
// Represents a project used in the React app after mapping from Strapi
export type Project = {
  id: string; // Unique database ID
  documentId: string; // Custom document identifier (used in routes)
  title: string; // Project title
  description: string; // Short description of the project
  image: string; // URL to the project's main image
  url: string; // Link to live project
  date: string; // Project date (ISO string)
  category: string; // Project category (e.g., "Web", "Mobile")
  featured: boolean; // Flag indicating if this project is featured
};

// Frontend-friendly Post type
// Represents a blog post used in the React app after mapping from Strapi
export type Post = {
  id: string; // Unique database ID
  slug: string; // URL slug for the post
  title: string; // Post title
  body: string; // Full post content in markdown or HTML
  excerpt: string; // Short excerpt for previews
  date: string; // Post date (ISO string)
  image: string; // URL to the post's main image
};

// Generic wrapper for Strapi API responses
// Strapi returns data in a { data: [...] } structure
export type StrapiResponse<T> = {
  data: T[]; // Array of Strapi items of type T
};

// Raw Strapi project type
// Matches the structure returned by the Strapi API for projects
export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
  image?: {
    // Optional image object
    url: string; // Main image URL
    formats?: {
      // Optional formats for different sizes
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
};

// Raw Strapi post type
// Matches the structure returned by the Strapi API for blog posts
export type StrapiPost = {
  id: string;
  documentId: string; // Optional or may be used for consistency
  title: string;
  slug: string; // URL slug
  excerpt: string; // Short preview text
  date: string;
  body: string; // Full content
  image?: {
    // Optional image object
    url: string; // Main image URL
    formats?: {
      // Optional formats for different sizes
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
};
