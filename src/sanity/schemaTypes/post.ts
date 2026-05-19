export default {
  name: 'post',
  title: 'Post (Notícias/Guias/Palpites)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      group: 'seo',
    },
    {
      name: 'seoCustomCode',
      title: 'SEO Custom Code (JSON-LD, Open Graph, etc)',
      type: 'text',
      description: 'Inject raw HTML/scripts like <script type="application/ld+json"> or <meta property="og:...">. This will be injected into the page <head>.',
      group: 'seo',
    },
  ],
  groups: [
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
