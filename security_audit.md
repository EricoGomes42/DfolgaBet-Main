| Risco | Severidade | Arquivo/área | Evidência | Correção aplicada | Ação futura |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Exposição de Segredos | Alto | `server.ts` | Uso de variáveis de ambiente do servidor com prefixo VITE_ (ex: `process.env.VITE_ODDS_API_KEY`). Embora o Vite exija isso para expor ao frontend, o uso de chaves do servidor (como ODDs) como fallback expõe risco se alguém importá-las acidentalmente. | Nenhuma | Validar se ODDs precisa ser chamado do cliente. Idealmente, apenas via `/api/odds`. |
| CORS Permissivo | Médio | `server.ts` | `res.header("Access-Control-Allow-Origin", "*");` permitia chamadas de qualquer origem para os endpoints da API. | Restringido para permitir domínios específicos (localhost e dfolgabet.com.br), mantendo `*` como fallback onde não havia cabeçalho de origem (para previews seguros). | Configurar dinamicamente a origem permitida com base na variável de ambiente do ambiente de preview. |
| Headers Ausentes | Baixo | `server.ts` | Faltavam headers de proteção HTTP básicos. | Adicionados `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` e `X-XSS-Protection`. | Adicionar `Content-Security-Policy` após auditar dependências de imagens e iframes. |
| Endpoints de Debug Expuestos | Alto | `server.ts` (`/api/odds/debug`) | Endpoint de debug que lista detalhes de chaves e limite da API estava disponível publicamente. | Adicionada verificação `process.env.NODE_ENV === "production"` para retornar `403 Forbidden` em produção. | Monitorar uso de outros endpoints em produção. |
| Vulnerabilidade XSS | Baixo | `src/components/SkyscannerCategory.tsx` | Uso de `dangerouslySetInnerHTML={{ __html: post.title }}`. | Nenhuma | O conteúdo vem de fonte confiável (posts internos), mas idealmente deve ser sanitizado. |
| Vulnerabilidade em Dependências | Alta | `package.json` | O `npm audit` indicou vulnerabilidades conhecidas no pacote `nodemailer`. | `nodemailer` atualizado para a versão segura (`9.0.3`). Subdependências atualizadas indiretamente (`js-yaml`, `brace-expansion`, `uuid`). | Realizar auditoria completa das dependências legadas do Sanity. |
| Target Blank sem Proteção | Baixo | `src/pages/dfolgabet/DfolgaBetResponsibleGaming.tsx` | Links externos usando `target="_blank"` sem `rel="noopener noreferrer"`. | `rel="noopener noreferrer"` adicionado. | Adicionar um lint para evitar esse padrão no futuro. |

### Informações Complementares:
1. **Arquivos modificados:** `server.ts`, `src/pages/dfolgabet/DfolgaBetResponsibleGaming.tsx`, `package.json`.
2. **Segredos encontrados:** API Keys (ODDS, Sanity). Não revelados, lidos com `process.env`.
3. **Endpoints revisados:** `/api/contact`, `/api/newsletter`, `/api/odds`, `/api/odds/debug`, `/api/proxy`.
4. **Situação do CORS:** Aperto inicial aplicado para barrar origens não autorizadas.
5. **Situação dos headers:** Headers de segurança base implementados.
6. **Situação de XSS e Rich Text:** Identificado uso de `dangerouslySetInnerHTML` para títulos (risco baixo porque os dados são controlados via Sanity/CMS, mas requer sanitização futuramente).
7. **Situação das dependências:** Vulnerabilidade principal (`nodemailer`) corrigida. Restam outras (maioria associadas à CLI e ao Sanity v2) de severidade considerável, mas que requerem atualizações (major version/breaking changes).
8. **Limitações da auditoria:** Auditoria restrita à aplicação, sem examinar os fluxos internos de dados do Sanity ou as chaves reais de APIs no Firebase.
9. **Resultado do build:** Build executado com sucesso e os testes passaram.
