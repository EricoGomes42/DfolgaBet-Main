export default {
  name: 'modalidade',
  title: 'Modalidade (Esportes/Cassino)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome da Modalidade',
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
      name: 'area',
      title: 'Área',
      type: 'string',
      options: {
        list: [
          {title: 'Esportes', value: 'Esportes'},
          {title: 'Cassino', value: 'Cassino'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Ordem de Exibição (Opcional)',
      type: 'number',
    },
    {
      name: 'icon',
      title: 'Ícone (Opcional)',
      type: 'image',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'area',
      media: 'icon',
    },
  },
}
