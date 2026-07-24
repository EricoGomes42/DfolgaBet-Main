import React, { useCallback, useEffect, useState } from 'react';
import { Stack, Text, Flex, Badge, Checkbox, Spinner } from '@sanity/ui';
import { set, unset, useClient } from 'sanity';

export function PromotedBookmakersInput(props: any) {
  const { value = [], onChange, schemaType } = props;
  const client = useClient({ apiVersion: '2023-01-01' });
  
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if this field is an array of references
  const isReferenceArray = !schemaType.options?.list;
  
  let extractedRef = null;
  try {
    const refObj = schemaType.of?.find((t: any) => t.name === 'reference' || t.type?.name === 'reference' || t.to);
    extractedRef = refObj?.to?.[0]?.name || refObj?.to?.[0]?.type?.name;
  } catch (e) {}
  
  const refType = extractedRef || 'casinoOperator';

  useEffect(() => {
    if (schemaType.options?.list) {
      setOptions(schemaType.options.list);
    } else if (isReferenceArray && refType) {
      setIsLoading(true);
      client.fetch(`*[_type == "${refType}"]{_id, title}`).then((docs) => {
        setOptions(docs.map((doc: any) => ({ value: doc._id, title: doc.title })));
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  }, [client, schemaType, isReferenceArray, refType]);

  const handleToggle = useCallback((optionValue: string) => {
    const current = Array.isArray(value) ? value : [];
    
    if (isReferenceArray) {
      const currentIndex = current.findIndex((item: any) => item._ref === optionValue);
      let newValue = [...current];
      if (currentIndex === -1) {
        // Generate a random key for the array item
        const _key = Math.random().toString(36).substring(2, 9);
        newValue.push({ _type: 'reference', _ref: optionValue, _key });
      } else {
        newValue.splice(currentIndex, 1);
      }
      onChange(newValue.length > 0 ? set(newValue) : unset());
    } else {
      const currentIndex = current.indexOf(optionValue);
      let newValue = [...current];
      if (currentIndex === -1) {
        newValue.push(optionValue);
      } else {
        newValue.splice(currentIndex, 1);
      }
      onChange(newValue.length > 0 ? set(newValue) : unset());
    }
  }, [value, onChange, isReferenceArray]);

  const isChecked = (optionValue: string) => {
    if (!Array.isArray(value)) return false;
    if (isReferenceArray) {
      return value.some((item: any) => item._ref === optionValue);
    }
    return value.includes(optionValue);
  };

  return (
    <Stack space={4}>
      <Flex justify="space-between" align="center" paddingBottom={2}>
        <Text size={1} weight="bold">{schemaType.title || 'Selecione as Casas Promovidas'}</Text>
        <Badge tone={Array.isArray(value) && value.length > 0 ? 'primary' : 'default'}>
          {Array.isArray(value) ? value.length : 0} selecionada(s)
        </Badge>
      </Flex>
      
      {isLoading ? (
        <Flex justify="center" padding={4}><Spinner /></Flex>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
          {options.map((option: any) => (
            <Flex key={option.value} align="center" gap={2}>
              <Checkbox 
                checked={isChecked(option.value)}
                onChange={() => handleToggle(option.value)}
              />
              <Text size={2} onClick={() => handleToggle(option.value)} style={{ cursor: 'pointer' }}>
                {option.title}
              </Text>
            </Flex>
          ))}
        </div>
      )}
    </Stack>
  );
}
