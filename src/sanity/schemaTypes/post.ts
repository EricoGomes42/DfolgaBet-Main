export default {
  name: 'post',
  title: 'Post (Notícias/Guias/Palpites)',
  type: 'document',
  fieldsets: [
    {
      name: 'bookmakers',
      title: 'Operadoras Associadas',
      options: {
        collapsible: true,
        collapsed: false,
      }
    }
  ],
  fields: [
    {
      name: 'promotedBookmakers',
      title: 'Casas de Aposta Promovidas',
      type: 'array',
      fieldset: 'bookmakers',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '7K', value: '7k'},
          {title: 'BetWinner', value: 'betwinner'},
          {title: 'Cassino', value: 'cassino'},
          {title: 'EstrelaBet', value: 'estrelabet'},
          {title: 'Lottoland', value: 'lottoland'},
          {title: 'MelBet', value: 'melbet'},
          {title: 'Novibet', value: 'novibet'},
          {title: 'Sorte Online', value: 'sorte-online'},
          {title: 'Stake', value: 'stake'},
          {title: 'Superbet', value: 'superbet'},
          {title: 'VeraBet', value: 'verabet'},
          {title: 'Vupi', value: 'vupi'},
        ]
      }
    },
    {
      name: 'featuredBookmaker',
      title: 'Operadora em Destaque',
      type: 'string',
      fieldset: 'bookmakers',
      hidden: true,
      options: {
        list: [
          {title: '7K', value: '7k'},
          {title: 'BetWinner', value: 'betwinner'},
          {title: 'Cassino', value: 'cassino'},
          {title: 'EstrelaBet', value: 'estrelabet'},
          {title: 'Lottoland', value: 'lottoland'},
          {title: 'MelBet', value: 'melbet'},
          {title: 'Novibet', value: 'novibet'},
          {title: 'Sorte Online', value: 'sorte-online'},
          {title: 'Stake', value: 'stake'},
          {title: 'Superbet', value: 'superbet'},
          {title: 'VeraBet', value: 'verabet'},
          {title: 'Vupi', value: 'vupi'},
        ]
      },
    },
    {
      name: 'sections',
      title: 'Vitrines (Onde exibir)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'Sports', value: 'sports'},
          {title: 'Casino', value: 'casino'},
          {title: 'Featured', value: 'featured'},
          {title: 'Future', value: 'future'},
        ],
      },
      initialValue: ['homepage', 'sports', 'casino', 'featured', 'future'],
    },
    {
      name: 'promotedCategory',
      title: 'Categoria Promovida',
      type: 'string',
      options: {
        list: [
          {title: 'Sports', value: 'sports'},
          {title: 'Casino', value: 'casino'},
          {title: 'Lottery', value: 'lottery'},
          {title: 'Poker', value: 'poker'},
          {title: 'eSports', value: 'esports'},
          {title: 'Virtual', value: 'virtual'},
          {title: 'Other', value: 'other'},
        ],
      },
    },
    {
      name: 'area',
      title: 'Área',
      type: 'string',
      options: {
        list: [
          {title: 'Esportes', value: 'Esportes'},
          {title: 'Cassino', value: 'Cassino'},
        ],
      },
    },
    {
      name: 'modalidade',
      title: 'Modalidade',
      type: 'reference',
      to: {type: 'modalidade'},
    },
    {
      name: 'heroParticipation',
      title: 'Participar do Hero',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'heroPriority',
      title: 'Prioridade Hero',
      type: 'number',
      description: 'Menor número = maior prioridade (ex: 1 aparece antes de 2).',
    },
    {
      name: 'isFeatured',
      title: 'Destaque?',
      type: 'boolean',
      initialValue: false,
    },

    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Use {ano} para inserir automaticamente o ano corrente.',
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
      name: 'sources',
      title: 'Fontes e Referências',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
            { name: 'institution', title: 'Instituição ou publicação', type: 'string' },
            { 
              name: 'type', 
              title: 'Tipo', 
              type: 'string',
              options: {
                list: ['Governo', 'Regulador', 'Operadora', 'Desenvolvedora de Jogos', 'Veículo Jornalístico', 'Estudo', 'Outro']
              }
            },
            { name: 'accessDate', title: 'Data de acesso', type: 'string' },
            { name: 'observation', title: 'Observação (opcional)', type: 'string' },
          ]
        }
      ]
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
      const {author, title} = selection
      const currentYear = new Date().getFullYear().toString()
      const resolvedTitle = title ? title.replace(/\{ano\}/gi, currentYear).replace(/\{year\}/gi, currentYear) : title
      return Object.assign({}, selection, {
        title: resolvedTitle,
        subtitle: author && `by ${author}`,
      })
    },
  },
}
