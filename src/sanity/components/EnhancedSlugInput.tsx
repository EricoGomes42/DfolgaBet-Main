import React from 'react';
import { Stack, Text, Card } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function EnhancedSlugInput(props: any) {
  const category = useFormValue(['primaryCategory']) as string;
  const contentType = useFormValue(['contentType']) as string;
  const slug = props.value?.current;

  let prefix = 'https://dfolgabet.com.br/';
  if (category === 'Cassino') {
     if (contentType === 'casinoGame') prefix += 'cassino/jogos/';
     else if (contentType === 'casinoOperatorArticle') prefix += 'cassino/casas/.../';
     else prefix += 'cassino/guias/';
  } else if (category === 'Esportes') {
     if (contentType === 'sportEvent') prefix += 'esportes/eventos/';
     else prefix += 'esportes/guias/';
  } else {
     prefix += 'dfolgabet/post/';
  }

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {slug && (
        <Card padding={3} tone="primary" radius={2}>
          <Text size={1}><strong>URL Final (Aproximada):</strong> {prefix}{slug}</Text>
        </Card>
      )}
    </Stack>
  );
}
