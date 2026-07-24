
import { DraftIndicator } from '../components/DraftIndicator';
import { SeoChecklistInput } from '../components/SeoChecklistInput';
import { ContentMetrics } from '../components/ContentMetrics';
import { ImportantFieldsPreview } from '../components/ImportantFieldsPreview';
import { HeroPriorityInput } from '../components/HeroPriorityInput';
import { PromotedBookmakersInput } from '../components/PromotedBookmakersInput';
import { EnhancedSlugInput } from '../components/EnhancedSlugInput';

import { CoverImageInfo } from '../components/CoverImageInfo';

export default {
  name: 'post',
  title: 'Post (Notícias/Guias/Palpites)',
  type: 'document',
  groups: [
    { name: 'geral', title: 'Informações Gerais', default: true },
    { name: 'classificacao', title: 'Classificação' },
    { name: 'conteudo', title: 'Conteúdo' },
    { name: 'midia', title: 'Mídia' },
    { name: 'hero', title: 'Hero' },
    { name: 'afiliados', title: 'Afiliados' },
    { name: 'seo', title: 'SEO' },
    { name: 'configuracoes', title: 'Configurações' },
  ],
  fields: [
    {
      name: 'draftIndicator',
      title: 'Status do Editor',
      type: 'string',
      group: 'geral',
      components: { input: DraftIndicator }
    },
    {
      name: 'importantFieldsPreview',
      title: 'Resumo Rápido',
      type: 'string',
      group: 'geral',
      components: { input: ImportantFieldsPreview }
    },
    {
      name: 'title',
      title: 'Título do Artigo',
      type: 'string',
      group: 'geral',
      description: 'Use {ano} para inserir automaticamente o ano corrente.',
    },
    {
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      group: 'geral',
      options: {
        source: 'title',
        maxLength: 96,
      },
      components: { input: EnhancedSlugInput }
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      group: 'geral',
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'},
      group: 'geral',
    },
    {
      name: 'primaryCategory',
      title: 'Categoria Principal',
      type: 'string',
      group: 'classificacao',
      options: {
        list: [
          { title: 'Cassino', value: 'Cassino' },
          { title: 'Esportes', value: 'Esportes' }
        ],
        layout: 'radio'
      },
      description: 'Todo post novo DEVE ter uma categoria principal definida.'
    },
    {
      name: 'contentType',
      title: 'Tipo de Conteúdo',
      type: 'string',
      group: 'classificacao',
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
      name: 'categories',
      title: 'Categorias (Tags secundárias)',
      type: 'array',
      group: 'classificacao',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'modalidade',
      title: 'Modalidade',
      type: 'reference',
      group: 'classificacao',
      to: {type: 'modalidade'},
    },
    {
      name: 'casinoGame',
      title: 'Jogo de Cassino',
      type: 'reference',
      group: 'classificacao',
      to: [{ type: 'casinoGame' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino'
    },
    {
      name: 'primaryCasinoOperator',
      title: 'Operadora Principal (Cassino)',
      type: 'reference',
      group: 'classificacao',
      to: [{ type: 'casinoOperator' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino',
      description: 'Obrigatório para artigos exclusivos de uma operadora (ex: Como depositar na 7K).'
    },
    {
      name: 'sportCompetition',
      title: 'Competição Esportiva',
      type: 'reference',
      group: 'classificacao',
      to: [{ type: 'sportCompetition' }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Esportes'
    },
    {
      name: 'sportEvent',
      title: 'Evento Esportivo (Partida)',
      type: 'string',
      group: 'classificacao',
      hidden: ({ document }: any) => document?.primaryCategory !== 'Esportes',
      description: 'Ex: Brasil x EUA Feminino'
    },
    {
      name: 'body',
      title: 'Corpo do Artigo',
      type: 'blockContent',
      group: 'conteudo',
    },
    {
      name: 'contentMetrics',
      title: 'Métricas do Conteúdo',
      type: 'string',
      group: 'conteudo',
      components: { input: ContentMetrics }
    },
    {
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      type: 'array',
      group: 'conteudo',
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
      name: 'coverImageInfo',
      title: 'Informações da Imagem',
      type: 'string',
      group: 'midia',
      components: { input: CoverImageInfo }
    },
    {
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      group: 'midia',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
          description: 'Descreva a imagem. Essencial para SEO.'
        }
      ]
    },
    {
      name: 'heroParticipation',
      title: 'Aparecer no Hero?',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    },
    {
      name: 'heroPriority',
      title: 'Prioridade no Hero',
      type: 'number',
      group: 'hero',
      components: { input: HeroPriorityInput }
    },
    {
      name: 'bookmakerKey',
      title: 'Casas de Aposta Promovidas',
      type: 'array',
      of: [{type: 'string'}],
      group: 'afiliados',
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
      components: { input: PromotedBookmakersInput },
      description: 'Selecione todas as casas de apostas promovidas ou mencionadas neste artigo.',
    },
    {
      name: 'casinoOperators',
      title: 'Operadoras Relacionadas (Cassino)',
      type: 'array',
      group: 'afiliados',
      of: [{ type: 'reference', to: [{ type: 'casinoOperator' }] }],
      hidden: ({ document }: any) => document?.primaryCategory !== 'Cassino',
      description: 'Casas citadas no artigo para gerar relacionamentos e cards.'
    },
    {
      name: 'seoChecklist',
      title: 'Análise SEO',
      type: 'string',
      group: 'seo',
      components: { input: SeoChecklistInput }
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
    {
      name: 'sections',
      title: 'Vitrines (Onde exibir)',
      type: 'array',
      group: 'configuracoes',
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
      title: 'Categoria Promovida (Legado)',
      type: 'string',
      group: 'configuracoes',
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
      title: 'Área (Legado)',
      type: 'string',
      group: 'configuracoes',
      options: {
        list: [
          {title: 'Esportes', value: 'Esportes'},
          {title: 'Cassino', value: 'Cassino'},
        ],
      },
    },
    {
      name: 'isFeatured',
      title: 'Destaque?',
      type: 'boolean',
      group: 'configuracoes',
      initialValue: false,
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
