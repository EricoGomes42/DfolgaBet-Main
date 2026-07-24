import React from 'react';
import { Stack, Text, Select } from '@sanity/ui';
import { set, unset } from 'sanity';

export function HeroPriorityInput(props: any) {
  const { value, onChange } = props;
  
  const options = [
    { title: 'Não exibir no Hero (Padrão)', value: '' },
    { title: '1 - Destaque Principal (Maior banner)', value: 1 },
    { title: '2 - Segundo Destaque (Menor banner topo)', value: 2 },
    { title: '3 - Terceiro Destaque (Menor banner meio)', value: 3 },
    { title: '4 - Quarto Destaque (Menor banner baixo)', value: 4 },
    { title: '5 - Quinto Destaque (Menor banner rodapé)', value: 5 },
  ];

  const handleChange = (e: any) => {
    const val = e.currentTarget.value;
    if (val === '') {
       onChange(unset());
    } else {
       onChange(set(Number(val)));
    }
  };

  return (
    <Stack space={3}>
      <Select value={value?.toString() || ''} onChange={handleChange} fontSize={2} padding={3}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.title}</option>
        ))}
      </Select>
      <Text size={1} muted>Controla a posição do artigo no carrossel/grid principal da página inicial.</Text>
    </Stack>
  );
}
