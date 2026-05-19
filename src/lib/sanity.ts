import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-05-09';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure we get fresh data immediately instead of cached
});

const builder = imageUrlBuilder(client);

// Helper function to build image URLs
export function urlFor(source: any) {
  return builder.image(source);
}
