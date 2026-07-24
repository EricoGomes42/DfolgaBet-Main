import React from 'react';
import { Card, Text, Stack, Flex, Badge, Box } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function SeoChecklistInput() {
  const document = useFormValue([]) as any;
  
  const checks = [
    { label: 'Título', passed: !!document?.title },
    { label: 'Slug', passed: !!document?.slug?.current },
    { label: 'Meta Description', passed: !!document?.seoDescription },
    { label: 'Imagem de Capa', passed: !!document?.mainImage?.asset },
    { label: 'Categoria', passed: !!document?.primaryCategory },
    { label: 'Autor', passed: !!document?.author?._ref },
    { label: 'Data', passed: !!document?.publishedAt },
    { label: 'Casas Promovidas', passed: Array.isArray(document?.bookmakerKey) && document.bookmakerKey.length > 0 },
    { label: 'Modalidade/Competição', passed: !!document?.modalidade?._ref || !!document?.sportCompetition?._ref || !!document?.primaryCasinoOperator?._ref },
    { label: 'FAQ', passed: Array.isArray(document?.faq) && document.faq.length > 0 },
  ];

  const score = checks.filter(c => c.passed).length;
  const total = checks.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <Card padding={4} radius={3} shadow={1} tone={percentage === 100 ? 'positive' : percentage > 50 ? 'caution' : 'critical'}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Text size={2} weight="bold">Checklist de Qualidade & SEO</Text>
          <Badge tone={percentage === 100 ? 'positive' : percentage > 50 ? 'caution' : 'critical'}>
            {score} / {total} Concluídos
          </Badge>
        </Flex>
        
        <Box>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {checks.map((check, idx) => (
              <Flex key={idx} align="center" gap={2}>
                {check.passed ? (
                  <Text size={1} style={{ color: 'green' }}>✓</Text>
                ) : (
                  <Text size={1} style={{ color: 'red' }}>✗</Text>
                )}
                <Text size={1} muted={!check.passed}>{check.label}</Text>
              </Flex>
            ))}
          </div>
        </Box>
      </Stack>
    </Card>
  );
}
