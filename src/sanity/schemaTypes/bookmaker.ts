export default {
  name: 'bookmaker',
  title: 'Casa de Aposta (Bookmaker)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome da Casa',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'logo',
      title: 'Logo da Casa de Aposta',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'rating',
      title: 'Avaliação (1 a 5)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'bonusTitle',
      title: 'Título do Bônus',
      description: 'Ex: Bônus de 100% até R$500',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link de Afiliado',
      type: 'url',
    },
    {
      name: 'features',
      title: 'Principais Recursos',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ex: Pix, Cash Out, App Mobile',
    },
    {
      name: 'review',
      title: 'Análise Completa (Review)',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bonusTitle',
      media: 'logo',
    },
  },
}
