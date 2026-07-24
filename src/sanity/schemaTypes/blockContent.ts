export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      title: 'Imagem',
      options: {hotspot: true},
      fields: [
        {
          name: 'internalTitle',
          type: 'string',
          title: 'Título Interno',
          description: 'Apenas para organização no Studio (não aparece no site)',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Legenda',
          description: 'Aparece logo abaixo da imagem, em itálico',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt)',
          description: 'Importante para SEO e Acessibilidade (descreve a imagem)',
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL de Destino',
          description: 'Link para onde o usuário será redirecionado ao clicar na imagem',
        },
        {
          name: 'openInNewTab',
          type: 'boolean',
          title: 'Abrir link em nova aba?',
          initialValue: true,
        },
        {
          name: 'isAffiliate',
          type: 'boolean',
          title: 'Banner Afiliado?',
          description: 'Adiciona tags patrocinadas ao link',
          initialValue: false,
        },
        {
          name: 'customClass',
          type: 'string',
          title: 'Classe CSS Personalizada (Opcional)',
        },
        {
          name: 'htmlId',
          type: 'string',
          title: 'ID HTML (Opcional)',
        },
      ],
      preview: {
        select: {
          title: 'internalTitle',
          caption: 'caption',
          alt: 'alt',
          media: 'asset',
        },
        prepare({title, caption, alt, media}: any) {
          return {
            title: title || caption || alt || 'Imagem do conteúdo',
            media
          }
        }
      }
    },
  ],
}
