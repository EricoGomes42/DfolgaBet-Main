import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TimePeriod = 'Tudo' | 'Hoje' | 'Amanhã' | 'Próximos 7 dias';

export interface FilterState {
  searchTerm: string;
  sportTab: string;
  leagueSlug: string | null;
  oddsMin: number;
  oddsMax: number;
  timePeriod: TimePeriod;
  marketFilters: string[];
}

export interface FilterContextProps {
  state: FilterState;
  setSearchTerm: (term: string) => void;
  setSportTab: (tab: string) => void;
  setLeagueSlug: (slug: string | null) => void;
  setOddsRange: (min: number, max: number) => void;
  setTimePeriod: (period: TimePeriod) => void;
  toggleMarketFilter: (marketKey: string) => void;
  resetFilters: () => void;
}

const defaultState: FilterState = {
  searchTerm: '',
  sportTab: 'Todos',
  leagueSlug: null,
  oddsMin: 1.0,
  oddsMax: 20.0,
  timePeriod: 'Tudo',
  marketFilters: ['h2h']
};

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(defaultState);

  const setSearchTerm = (searchTerm: string) => setState(s => ({ ...s, searchTerm }));
  const setSportTab = (sportTab: string) => setState(s => ({ ...s, sportTab }));
  const setLeagueSlug = (leagueSlug: string | null) => setState(s => ({ ...s, leagueSlug }));
  const setOddsRange = (oddsMin: number, oddsMax: number) => setState(s => ({ ...s, oddsMin, oddsMax }));
  const setTimePeriod = (timePeriod: TimePeriod) => setState(s => ({ ...s, timePeriod }));
  
  const toggleMarketFilter = (marketKey: string) => {
    setState(s => {
      const exists = s.marketFilters.includes(marketKey);
      if (exists) {
        return { ...s, marketFilters: s.marketFilters.filter(k => k !== marketKey) };
      }
      return { ...s, marketFilters: [...s.marketFilters, marketKey] };
    });
  };

  const resetFilters = () => setState(defaultState);

  return (
    <FilterContext.Provider value={{
      state, setSearchTerm, setSportTab, setLeagueSlug, setOddsRange, setTimePeriod, toggleMarketFilter, resetFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useDfolgaBetFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useDfolgaBetFilters must be used within a FilterProvider');
  }
  return context;
}
