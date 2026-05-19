/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { DarkModeProvider } from './hooks/useDarkMode';

// DfolgaBet Pages
import DfolgaBetLayout from './pages/dfolgabet/DfolgaBetLayout';
import DfolgaBetHome from './pages/dfolgabet/DfolgaBetHome';
import DfolgaBetResponsibleGaming from './pages/dfolgabet/DfolgaBetResponsibleGaming';
import DfolgaBetBookmakers from './pages/dfolgabet/DfolgaBetBookmakers';
import DfolgaBetPredictions from './pages/dfolgabet/DfolgaBetPredictions';
import DfolgaBetBonuses from './pages/dfolgabet/DfolgaBetBonuses';
import DfolgaBetGuides from './pages/dfolgabet/DfolgaBetGuides';
import DfolgaBetPost from './pages/dfolgabet/DfolgaBetPost';
import DfolgaBetDicas from './pages/dfolgabet/DfolgaBetDicas';
import DfolgaBetEstatisticas from './pages/dfolgabet/DfolgaBetEstatisticas';
import DfolgaBetSaudeMental from './pages/dfolgabet/DfolgaBetSaudeMental';
import DfolgaBetSobre from './pages/dfolgabet/DfolgaBetSobre';
import DfolgaBetPredictionDetails from './pages/dfolgabet/DfolgaBetPredictionDetails';
import DfolgaBetRestricoesApostadores from './pages/dfolgabet/DfolgaBetRestricoesApostadores';
import DfolgaBetTermosCondicoes from './pages/dfolgabet/DfolgaBetTermosCondicoes';
import DfolgaBetPoliticaPrivacidade from './pages/dfolgabet/DfolgaBetPoliticaPrivacidade';
import DfolgaBetCompetitionPage from './pages/dfolgabet/DfolgaBetCompetitionPage';
import CaliariVsBannon from './pages/dfolgabet/articles/CaliariVsBannon';
import FlamengoVsFluminense from './pages/dfolgabet/articles/FlamengoVsFluminense';
import AliceVsPolyana from './pages/dfolgabet/articles/AliceVsPolyana';

// Sanity Studio
import SanityStudio from './pages/SanityStudio';

import DfolgaBetPlaceholder from './pages/dfolgabet/DfolgaBetPlaceholder';

export default function App() {
  return (
    <DarkModeProvider>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        {/* Sanity Studio Route */}
        <Route path="/studio/*" element={<SanityStudio />} />

        {/* DfolgaBet Routes mapped to / */}
        <Route path="/" element={<DfolgaBetLayout />}>
          <Route index element={<DfolgaBetHome />} />
          <Route path="casas-de-apostas" element={<DfolgaBetBookmakers />} />
          <Route path="prognosticos" element={<DfolgaBetPredictions />} />
          <Route path="bonus" element={<DfolgaBetBonuses />} />
          <Route path="guias" element={<DfolgaBetGuides />} />
          <Route path="dicas" element={<DfolgaBetDicas />} />
          <Route path="estatisticas" element={<DfolgaBetEstatisticas />} />
          <Route path="saude-mental" element={<DfolgaBetSaudeMental />} />
          <Route path="sobre" element={<DfolgaBetSobre />} />
          <Route path="dfolgabet/jogo-responsavel" element={<DfolgaBetResponsibleGaming />} />
          <Route path="dfolgabet/restricoes-apostadores" element={<DfolgaBetRestricoesApostadores />} />
          <Route path="dfolgabet/termos-e-condicoes" element={<DfolgaBetTermosCondicoes />} />
          <Route path="dfolgabet/politica-de-privacidade" element={<DfolgaBetPoliticaPrivacidade />} />
          <Route path="dfolgabet/competicao/:slug" element={<DfolgaBetCompetitionPage />} />
          <Route path="dfolgabet/post/:slug" element={<DfolgaBetPost />} />
          <Route path="palpite/:id" element={<DfolgaBetPredictionDetails />} />
          <Route path="ufc-caliari-vs-bannon" element={<CaliariVsBannon />} />
          <Route path="flamengo-x-fluminense-feminino-palpites-odds-15-05-2026" element={<FlamengoVsFluminense />} />
          <Route path="alice-ardelean-polyana-viana-ufc-fight-night" element={<AliceVsPolyana />} />
          
          {/* Outras rotas do DfolgaBet serão adicionadas aqui */}
          <Route path="prognosticos/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="casas-de-apostas/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="codigos-promocionais/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="bonus/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="competicao/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="melhores-bonus" element={<DfolgaBetPlaceholder />} />
          <Route path="guias/:id" element={<DfolgaBetPlaceholder />} />
          <Route path="dicas/:id" element={<DfolgaBetPlaceholder />} />
          
          <Route path="dfolgabet/prognosticos/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/casas-de-apostas/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/codigos-promocionais/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/bonus/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/competicao/:slug" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/melhores-bonus" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/guias/:id" element={<DfolgaBetPlaceholder />} />
          <Route path="dfolgabet/dicas/:id" element={<DfolgaBetPlaceholder />} />
        </Route>
      </Routes>
    </DarkModeProvider>
  );
}
