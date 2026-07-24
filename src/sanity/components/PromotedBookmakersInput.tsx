import React, { useCallback } from 'react';
import { Stack, Text, Flex, Badge, Checkbox } from '@sanity/ui';
import { set, unset } from 'sanity';

export function PromotedBookmakersInput(props: any) {
  const { value = [], onChange, schemaType } = props;
  const options = schemaType.options?.list || [];

  const handleToggle = useCallback((optionValue: string) => {
    const current = Array.isArray(value) ? value : [];
    const currentIndex = current.indexOf(optionValue);
    let newValue = [...current];
    
    if (currentIndex === -1) {
      newValue.push(optionValue);
    } else {
      newValue.splice(currentIndex, 1);
    }
    
    onChange(newValue.length > 0 ? set(newValue) : unset());
  }, [value, onChange]);

  return (
    <Stack space={4}>
      <Flex justify="space-between" align="center" paddingBottom={2}>
        <Text size={1} weight="bold">Selecione as Casas Promovidas</Text>
        <Badge tone={value.length > 0 ? 'primary' : 'default'}>
          {value.length} selecionada(s)
        </Badge>
      </Flex>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
        {options.map((option: any) => (
          <Flex key={option.value} align="center" gap={2}>
            <Checkbox 
              checked={Array.isArray(value) && value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
            <Text size={2} onClick={() => handleToggle(option.value)} style={{ cursor: 'pointer' }}>
              {option.title}
            </Text>
          </Flex>
        ))}
      </div>
    </Stack>
  );
}
