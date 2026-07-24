import React from 'react';
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
    structureTool({
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'post') {
          return S.document().views([
            S.view.form(),
            S.view
              .component((props: any) => {
                 const slug = props?.document?.displayed?.slug?.current;
                 if (!slug) {
                    return (
React.createElement('div', { style: { padding: 20, fontFamily: 'sans-serif' } }, 
                          React.createElement('h2', null, 'Nenhum Slug definido'),
                          React.createElement('p', null, 'Adicione um slug para ver o preview do artigo.')
                       )
                    );
                 }
                 const url = `/api/preview?slug=${slug}`;
                 return (
                    React.createElement('iframe', { src: url, style: { width: '100%', height: '100%', border: 'none' }, title: 'Preview' })
                 );
              })
              .title('Preview Web')
          ])
        }
        return S.document().views([S.view.form()])
      }
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
