import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { applyDynamicContentToResult } from './dynamicContent';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-05-09';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure we get fresh data immediately instead of cached
});

// Proxy client.fetch to avoid CORS issues by proxying through our backend
const originalFetch = client.fetch.bind(client);

client.fetch = async (query: string, params?: any, options?: any) => {
  let url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url += `&$${key}=${encodeURIComponent(JSON.stringify(value))}`;
    }
  }
  
  const proxyUrl = typeof window !== "undefined" ? `${window.location.origin}/api/proxy?url=${encodeURIComponent(url)}` : `http://127.0.0.1:3000/api/proxy?url=${encodeURIComponent(url)}`;
  
  try {
    const response = await fetch(proxyUrl, { signal: options?.signal });
    if (!response.ok) throw new Error(`Proxy fetch failed: ${response.statusText}`);
    const result = await response.json();
    return applyDynamicContentToResult(result.result); 
  } catch (error) {
    console.error("Proxy fetch failed, falling back", error);
    const fallbackResult = await originalFetch(query, params, options);
    return applyDynamicContentToResult(fallbackResult);
  }
};

const builder = imageUrlBuilder(client);

// Helper function to build image URLs
export function urlFor(source: any) {
  return builder.image(source);
}
