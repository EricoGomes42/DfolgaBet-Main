import React from 'react';
import { Card, Text, Flex, Box } from '@sanity/ui';
import { useFormValue } from 'sanity';

function extractTextFromBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join('\n');
}

export function ContentMetrics(props: any) {
  const body = useFormValue(['body']) as any[];
  const text = extractTextFromBlocks(body);
  
  const chars = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200) || 1;
  
  return (
    <Card padding={3} radius={2} tone="transparent" border style={{ backgroundColor: '#f9f9f9', marginTop: '16px' }}>
      <Flex gap={4} justify="space-around">
        <Box style={{ textAlign: 'center' }}>
          <Text size={1} muted>Palavras</Text>
          <Text size={3} weight="bold" style={{ marginTop: '8px' }}>{words}</Text>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Text size={1} muted>Caracteres</Text>
          <Text size={3} weight="bold" style={{ marginTop: '8px' }}>{chars}</Text>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Text size={1} muted>Tempo de Leitura</Text>
          <Text size={3} weight="bold" style={{ marginTop: '8px' }}>~{readingTime} min</Text>
        </Box>
      </Flex>
    </Card>
  );
}
