import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

// Use environment variables for project ID and dataset, but default to the ones you provided
export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'DfolgaBet Studio',

  projectId,
  dataset,

  // Replace with the path to your studio if not deployed at the root
  basePath: '/studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
