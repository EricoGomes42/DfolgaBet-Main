import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Add imports if they don't exist
if "import CasinoOperatorHub" not in content:
    content = content.replace("import DfolgaBetPoliticaPrivacidade", "import CasinoOperatorHub from './pages/dfolgabet/CasinoOperatorHub';\nimport SportCompetitionHub from './pages/dfolgabet/SportCompetitionHub';\nimport DfolgaBetPoliticaPrivacidade")

# Replace DfolgaBetBookmakerPage with CasinoOperatorHub for casas/:operatorSlug
content = re.sub(r'<Route path="casas/:operatorSlug" element=\{<DfolgaBetBookmakerPage bookmakerSlug="" />\} />', '<Route path="casas/:operatorSlug" element={<CasinoOperatorHub />} />', content)
content = re.sub(r'<Route path="dfolgabet/casas/:operatorSlug" element=\{<DfolgaBetBookmakerPage bookmakerSlug="" />\} />', '<Route path="dfolgabet/casas/:operatorSlug" element={<CasinoOperatorHub />} />', content)

# Replace DfolgaBetCompetitionPage with SportCompetitionHub for esportes/competicoes/:competitionSlug
content = re.sub(r'<Route path="esportes/competicoes/:competitionSlug" element=\{<DfolgaBetCompetitionPage />\} />', '<Route path="esportes/competicoes/:competitionSlug" element={<SportCompetitionHub />} />', content)

with open("src/App.tsx", "w") as f:
    f.write(content)

