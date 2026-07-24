import React from 'react';
import { Card, Text, Flex } from '@sanity/ui';

export function DraftIndicator() {
  return (
    <Card padding={3} radius={2} tone="positive" border marginBottom={4}>
      <Flex align="center" gap={2} justify="center">
        <Text size={1} weight="bold">✓ Editor Inteligente Ativo. Suas alterações são salvas automaticamente em rascunho.</Text>
      </Flex>
    </Card>
  );
}
