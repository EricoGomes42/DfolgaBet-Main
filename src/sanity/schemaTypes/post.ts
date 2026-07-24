export default {
  name: 'post',
  title: 'Post (Notícias/Guias/Palpites)',
  type: 'document',
  fields: [
    {
      name: 'bookmakerKey',
      title: 'Casas de Aposta Promovidas',
      type: 'array',
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
      },
      description: 'Selecione todas as casas de apostas promovidas ou mencionadas neste artigo.',
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
      type: 'array',
      of: [{type: 'string'}],
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
      name: 'primaryCategory',
      title: 'Categoria Principal',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'Cassino', value: 'Cassino' },
          { title: 'Esportes', value: 'Esportes' }
        ]
      },
      description: 'Todo post novo DEVE ter uma categoria principal definida.'
    },
    {
      name: 'contentType',
      title: 'Tipo de Conteúdo',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          { title: 'Jogo de Cassino', value: 'casinoGame' },
          { title: 'Guia de Cassino', value: 'casinoGuide' },
          { title: 'Artigo de Operadora de Cassino', value: 'casinoOperatorArticle' },
          { title: 'Evento Esportivo', value: 'sportEvent' },
          { title: 'Guia de Esportes', value: 'sportGuide' },
        ]
      },
      description: 'Define a estrutura da URL e o propósito do conteúdo.'
    },
    {
      name: 'casinoGame',
      title: 'Jogo de Cassino',
      type: 'reference',
      to: [{ type: 'casinoGame' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino'
    },
    {
      name: 'primaryCasinoOperator',
      title: 'Operadora Principal (Cassino)',
      type: 'reference',
      to: [{ type: 'casinoOperator' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino',
      description: 'Obrigatório para artigos exclusivos de uma operadora (ex: Como depositar na 7K).'
    },
    {
      name: 'casinoOperators',
      title: 'Operadoras Relacionadas (Cassino)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'casinoOperator' }] }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino',
      description: 'Casas citadas no artigo para gerar relacionamentos e cards.'
    },
    {
      name: 'sportEvent',
      title: 'Evento Esportivo (Partida)',
      type: 'string',
      hidden: ({ document }: any) => document?.primaryCategory !== 'Esportes',
      description: 'Ex: Brasil x EUA Feminino'
    },
    {
      name: 'sportCompetition',
      title: 'Competição Esportiva',
      type: 'reference',
      to: [{ type: 'sportCompetition' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Esportes'
    },
    {
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pergunta', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'answer', title: 'Resposta', type: 'text', validation: (Rule: any) => Rule.required() }
          ]
        }
      ],
      description: 'Obrigatório para novos posts. Adicione as perguntas frequentes do artigo.'
    },
    {
      name: 'area',
      title: 'Área (Legado)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Esportes', value: 'Esportes'},
          {title: 'Cassino', value: 'Cassino'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
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
