import React from 'react';
import { Card, Text, Flex, Box } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function CoverImageInfo() {
  const mainImage = useFormValue(['mainImage']) as any;
  
  if (!mainImage?.asset?._ref) {
    return (
      <Card padding={3} radius={2} tone="critical" border marginTop={3}>
        <Text size={1} weight="bold">⚠ Atenção: Imagem de capa está vazia. Ela é obrigatória para SEO e vitrines da Home.</Text>
      </Card>
    );
  }

  const refParts = mainImage.asset._ref.split('-');
  const dimensions = refParts.length > 2 ? refParts[2] : 'Desconhecidas';
  const format = refParts.length > 3 ? refParts[3] : '';

  return (
    <Card padding={3} radius={2} tone="transparent" border style={{ backgroundColor: '#f4f5f7', marginTop: '12px' }}>
      <Flex gap={4}>
        <Box>
          <Text size={1} muted>Resolução Original</Text>
          <Text size={2} weight="bold" style={{ marginTop: '4px' }}>{dimensions} px</Text>
        </Box>
        <Box>
          <Text size={1} muted>Formato</Text>
          <Text size={2} weight="bold" style={{ marginTop: '4px' }}>{format.toUpperCase()}</Text>
        </Box>
        <Box>
          <Text size={1} muted>Status do Alt Text</Text>
          <Text size={2} weight="bold" style={{ marginTop: '4px', color: mainImage.alt ? 'green' : 'red' }}>
            {mainImage.alt ? '✓ Preenchido' : '✗ Faltando'}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
