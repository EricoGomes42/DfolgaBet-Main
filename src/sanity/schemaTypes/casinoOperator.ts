export default {
  name: 'casinoOperator',
  title: 'Operadora de Cassino',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Ativo', value: 'active' }, { title: 'Inativo', value: 'inactive' }] }, initialValue: 'active' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Descrição Curta', type: 'text' },
    { name: 'websiteUrl', title: 'URL do Site (Opcional)', type: 'url' },
    { name: 'affiliateUrl', title: 'URL de Afiliado (Opcional)', type: 'url' },
    { name: 'seoTitle', title: 'SEO Title (Opcional)', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description (Opcional)', type: 'text' }
  ],
  preview: { select: { title: 'title', media: 'logo', subtitle: 'status' } }
}
