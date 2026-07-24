import React from 'react';
import { Card, Text, Stack, Box } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function ImportantFieldsPreview() {
  const document = useFormValue([]) as any;
  
  return (
    <Card padding={4} radius={3} shadow={1} tone="transparent" style={{ backgroundColor: '#fafbfc', border: '1px solid #e1e4e8', marginTop: '16px' }}>
      <Stack space={4}>
        <Text size={1} weight="bold" muted>VISÃO GERAL DO ARTIGO</Text>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
           <Box>
             <Text size={0} muted>Prioridade Hero</Text>
             <Text size={2} weight="bold">{document?.heroPriority || 'Não exibir'}</Text>
           </Box>
           <Box>
             <Text size={0} muted>Categoria</Text>
             <Text size={2} weight="bold">{document?.primaryCategory || '-'}</Text>
           </Box>
           <Box>
             <Text size={0} muted>Casas Promovidas</Text>
             <Text size={2} weight="bold">{(Array.isArray(document?.bookmakerKey) ? document.bookmakerKey.length : 0)} selecionadas</Text>
           </Box>
           <Box>
             <Text size={0} muted>Tipo de Conteúdo</Text>
             <Text size={2} weight="bold">{document?.contentType || '-'}</Text>
           </Box>
        </div>
      </Stack>
    </Card>
  );
}
