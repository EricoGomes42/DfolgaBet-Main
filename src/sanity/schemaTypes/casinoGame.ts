export default {
  name: 'casinoGame',
  title: 'Jogo de Cassino',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Ativo', value: 'active' }, { title: 'Inativo', value: 'inactive' }] }, initialValue: 'active' },
    { name: 'image', title: 'Imagem', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Descrição Curta', type: 'text' },
    { name: 'seoTitle', title: 'SEO Title (Opcional)', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description (Opcional)', type: 'text' }
  ],
  preview: { select: { title: 'title', media: 'image', subtitle: 'status' } }
}
