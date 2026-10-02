# Revisão completa do site Cut Code

## 1. Veredito geral

O site tem boa base técnica. O código é pequeno e organizado, a tipagem é estrita, não há segredos no repositório, o `npm audit` não acusa nada, o CLS medido é 0 e o cuidado com acessibilidade está acima da média. **Ainda assim, não está pronto para divulgar.** Há três motivos:

- **A prova social não é real.** "Trabalhos que já estão no ar" mostra fotos do Unsplash ligadas a clientes com nome, e essa versão **já está pública** em `cut-code.pages.dev`.
- **Os canais de contato estão vazios.** Os botões "WhatsApp" e "Instagram" não abrem nada.
- **O trabalho desta sessão não está commitado** e fica numa pasta do OneDrive, sem backup.

O site convence mais como peça visual do que como ferramenta de venda. A oferta está espalhada em 5 nichos, 6 serviços e 2 pacotes, sem preço, sem depoimento e sem medição. Quase todas as correções urgentes custam pouco (esforço P).

| Frente | Nota | Justificativa |
|---|---|---|
| Estrutura | 7/10 | Bem organizada e tipada. Perde pontos por estar tudo sem commit, pelo deploy que não dá para reproduzir e por ~650 linhas de código morto. |
| Segurança | 7/10 | A superfície de ataque é pequena e não há segredos. Faltam aviso de LGPD e cabeçalhos de segurança, o repositório é público e há fotos de banco ligadas a clientes reais no ar. |
| UX | 5/10 | A acessibilidade e o formulário são bons, mas a conversão é sabotada por canais vazios, prova falsa e animações sem pausa. |
| UI | 6,5/10 | O vidro, a paleta e os tokens são bem feitos. Mas o mesmo efeito se repete em todo lugar, não há hierarquia entre os pacotes e o site mostra fotos em vez do produto. |
| Performance/SEO | 6/10 | O bundle é enxuto e o CLS é 0. Faltam og:image absoluta, canonical e medição, e o HTML chega vazio sem JS. |
| Negócio | 4,5/10 | A proposta é clara e os prazos diferenciam. Mas o foco está espalhado, não há âncora de preço, a receita recorrente é fraca e falta prova. |
| Formato | 5,5/10 | A SPA estática serve hoje. Ela limita páginas por nicho, cases e SEO local, e a captura de leads é frágil. |

## 2. Top 10 prioridades

| # | Ação | Frente | Sev. | Esforço | Por quê |
|---|---|---|---|---|---|
| 1 | Ocultar o portfólio e os "cases" com fotos do Unsplash (ou trocar o título por um verdadeiro) e **republicar já**, porque a versão no ar exibe "Clínica Santa Lourdes" e "Dra. Vanine" com fotos de banco. Obter autorização por escrito dos clientes. | Negócio/UX/Segurança | Crítica | P (ocultar) / M (material real) | É afirmação falsa sobre terceiros com nome. Há risco de reputação e de publicidade enganosa (CDC art. 37), e destrói a confiança na seção que mais vende. |
| 2 | Commit em partes temáticas + push para `Gabnagawo/cut-code`. Depois, tirar o projeto do OneDrive. | Estrutura | Alta | P | O rebrand, o formulário (`contact-form.tsx` sem rastreio) e os pacotes só existem no disco local. |
| 3 | Preencher o WhatsApp Business e o Instagram. Enquanto estiverem vazios, esconder os cards e links "WhatsApp/Instagram" em vez de levar a `#contato`. | UX/Negócio | Alta | P | Hoje os cards dentro de `#contato` não fazem nada visível (`content.ts:15-27`, `contact.tsx:12-13`, `faq.tsx:62`). |
| 4 | Fazer um envio de teste em produção para ativar o FormSubmit e depois trocar o e-mail da URL pelo alias com hash. | Segurança/Negócio | Alta | P | Sem ativação, os primeiros leads veem erro (`contact-form.tsx:9-12`), e hoje esse é o único canal que funciona. |
| 5 | og:image absoluta + og:url, og:type, og:locale e `<link rel=canonical>` (exige definir o domínio). | Perf/SEO | Alta | P | `index.html:11` usa `assets/og.png` relativo. A prévia no WhatsApp tende a sair sem imagem, e é o principal canal de divulgação. |
| 6 | Aviso de privacidade abaixo do botão de envio + página `/privacidade` + rodapé com região atendida e responsável. | Segurança/UX | Média | P | O formulário envia dados pessoais a um terceiro sem nenhum aviso (LGPD art. 9). O público de clínicas é sensível a isso. |
| 7 | Analytics sem cookies (Cloudflare Web Analytics ou Plausible) + eventos de clique no WhatsApp e envio do formulário. | Perf/Negócio | Média | P | Hoje não dá para saber qual nicho, pacote ou canal converte, e todas as decisões de negócio dependem disso. |
| 8 | No hero: fazer o CTA caber em 1366x768 e pôr pausa ou fim nas animações (marquee, palavras rotativas, autoplay). | UI/UX | Média | P | O CTA fica em y=840 numa tela de 768 (`hero.tsx:47-74`). Há falha WCAG 2.2.2 (nível A). |
| 9 | Conectar o repositório ao Cloudflare Pages (deploy por Git) + `public/_headers` com CSP e frame-ancestors + `.env*` no `.gitignore`. | Estrutura/Segurança | Média | P | O site no ar hoje não tem fonte no Git e não tem cabeçalhos de segurança. |
| 10 | FAQ com preço e pagamento, ajustes inclusos e propriedade do domínio. Condicionar os prazos no hero ("após materiais completos"). Trocar "Mais escolhido" por "Recomendado". | Negócio | Média | P | São as objeções reais de pequenos negócios. Hoje há promessas sem condição e um selo sem base (`content.ts:150`). |

## 3. Análise por frente

### 3.1 Estrutura e qualidade de código
**O que está bom:** uma seção por arquivo, `App.tsx` só compõe as seções, o conteúdo fica centralizado em `src/data/content.ts`, o modo `strict` está ligado e o `tsc -b` roda no build. Os efeitos têm cleanup, há `linkProps` com `noopener noreferrer` e o README documenta o projeto.

**Problemas confirmados:**
- **Sem commit e sem backup (alta).** Há um único commit (`815d399`), 12 arquivos modificados e `contact-form.tsx` sem rastreio, tudo dentro do OneDrive, inclusive `.git` e `node_modules`. O `dist/` publicado já inclui o FormSubmit, que não está no git, então o que está no ar não tem fonte reproduzível.
- **Deploy não reproduzível (média).** Não há `wrangler.toml`, `_headers`, `_redirects`, `engines` nem `.nvmrc`. O README:12 cita GitHub Pages, Netlify e Vercel, mas o site está no Cloudflare Pages.
- **WebGL sempre cai no fallback em modo dev (média).** O `StrictMode` (`main.tsx:8`) monta o componente duas vezes, e o `loseContext()` no cleanup (`glass-blob.tsx:284`) deixa o segundo mount sem contexto. Reproduzido: 0 canvas no `vite` e 4 no `preview`. Os shaders também não são liberados quando falham (`glass-blob.tsx:185-187`).
- **Código morto (baixa).** `ui/card.tsx`, `ui/carousel.tsx`, `vertical-thumbnail-slider.tsx` e `src/demos/` não são usados por nenhuma seção. Está escondido por `noUnusedLocals: false` (`tsconfig.app.json:14`).
- **Dados e UI separados pela metade (baixa).** Os prazos se repetem em `hero.tsx:104-107` e `content.ts`. O array paralelo `ICONS[i]` em `process.tsx:8` quebra a página se alguém adicionar um 5º passo, e não há ErrorBoundary.
- **Sem lint e sem CI (baixa).** README:22/27/73/75 estão desatualizados (citam REELS, demos e o nome antigo). Há logos PNG sem uso, e o logo da nav tem 31 KB para ser exibido com 20 px.

**Recomendação:** commit e push hoje, deploy pelo Git com `npm ci`, `engines` com `>=22.12`, apagar o código morto e ligar `noUnusedLocals`. Corrigir o GlassBlob liberando os recursos sem chamar `loseContext`, ou criando o canvas dentro do efeito. ESLint com react-hooks e um workflow de build no push são opcionais, mas úteis se o repositório virar template.

### 3.2 Segurança e cibersegurança
**O que está bom:** não há `dangerouslySetInnerHTML` nem `eval`, o `npm audit` não aponta nada, o lockfile está versionado, não há sourcemaps nem segredos no histórico. O honeypot está ativo e o Cloudflare já entrega `nosniff` e `Referrer-Policy`.

**Problemas confirmados:**
- **Fotos de banco ligadas a clientes nomeados, já em produção (média, mas urgente).** O bundle no ar (`index-RDZOuwz_.js`) contém Santa Lourdes e Dra. Vanine com fotos do Unsplash. No código local está em `content.ts:224-256`. O código não registra se os clientes autorizaram.
- **LGPD (média).** `contact-form.tsx:74-84` envia nome, contato, nicho e mensagem ao FormSubmit (EUA) e ao Gmail. Não há nenhum texto de privacidade em `src/`.
- **Cabeçalhos ausentes (baixa).** `curl -sI cut-code.pages.dev` não retorna CSP, frame-ancestors nem Permissions-Policy, e não existe `public/_headers`.
- **Repositório público (baixa).** Expõe o e-mail pessoal no commit `815d399` e `docs/Cut-and-Code-previa-do-site.pdf`. O `.gitignore` não cobre `.env*`.
- **FormSubmit (baixa).** O e-mail aparece no endpoint (`contact-form.tsx:12`), há `_captcha:"false"` (`:82`) e nenhum campo tem `maxLength`.
- **Gmail como ponto único de falha, sem domínio próprio (baixa).** Higiene da conta: 2FA com passkey e recuperação configurada.
- **Divergência entre o que está no ar e o git (baixa).** A produção ainda é "Cut & Code".

**Recomendação:** criar `_headers` começando em CSP Report-Only, com `connect-src`/`form-action` liberando `formsubmit.co` e `frame-ancestors 'none'`. Adicionar `.env*` ao `.gitignore`, ativar Push Protection e Dependabot e configurar o e-mail noreply no git. Tornar o repositório privado é opcional. Turnstile e Pages Function só valem se o spam aparecer de fato.

### 3.3 UX, conversão e acessibilidade
**O que está bom:** skip link, um único h1, abas ARIA com teclado e FAQ com `<details>`. O formulário valida no blur, leva o foco ao primeiro erro e oferece o e-mail como alternativa quando falha. Reduced-motion é respeitado e não há scroll horizontal.

**Problemas confirmados:**
- **Prova social falsa (crítica).** `portfolio.tsx:11` diz "no ar", mas os dois clientes têm `url: ""` (`content.ts:236,251`) e os alt são "Site: Página inicial" sobre fotos de banco (`client-showcase.tsx:175`). O hero faz o mesmo para nichos sem nenhum cliente (`content.ts:46-81`).
- **Canais vazios (alta).** Os cards "WhatsApp" e "Instagram", o rodapé e "Tirar dúvida no WhatsApp" apontam para `#contato`. Os CTAs "Pedir orçamento" funcionam, porque levam ao formulário.
- **Animações sem pausa (média, WCAG 2.2.2).** Marquee infinito (`niches.tsx:8`), palavras rotativas a cada 2,2 s (`rotating-words.tsx:18-21`) e autoplay de 7 s que no toque não pausa. No celular também não dá para arrastar o carrossel do hero (`hero.tsx:151-153`).
- **Campo de contato (média).** `autoComplete="email"` e `inputMode="email"` num campo que aceita telefone (`contact-form.tsx:132-133`), e o nome usa `autoComplete="organization"`.
- **Pós-envio (média).** O form é desmontado com o foco dentro, o foco vai para o `<body>`, e a mensagem de sucesso não dá prazo de resposta (`contact-form.tsx:95-112`).
- **O serviço escolhido se perde (média).** O select começa vazio, com 10 opções, 3 delas sobre eventos.
- **Pacotes "Sob consulta" e FAQ com só 3 perguntas, sem preço, inclusos ou região (média).** Também falta rodapé institucional (média).
- **Itens menores (baixa).** Rótulos "Ir para o slide N", trecho do `text-iris` com ~2,9:1 de contraste, e falta de CTA no mobile depois do hero.

**Recomendação:** o objetivo primário deve ser um só (recomendação: WhatsApp, com o formulário como alternativa). Pré-selecionar o serviço no select via `#contato?servico=` e reduzir para 4 ou 5 opções. Corrigir o campo de contato (`inputMode="text"` ou um campo `tel` separado). Ao enviar, mover o foco para o título de sucesso e informar o prazo de resposta. Pôr um botão de pausa no carrossel, parar as palavras rotativas depois de 1 ciclo e deixar o marquee estático ou com pausa.

### 3.4 UI e design visual
**O que está bom:** a paleta segue o 60-30-10, o utilitário `glass` tem bom acabamento, os tokens de movimento seguem o Material 3, a fonte é uma família só (Inter/Inter Tight) e o foco é visível.

**Problemas confirmados:**
- **Fotos de interiores rotuladas "Site" (alta).** A mesma foto aparece no hero e no portfólio (`content.ts:50`). Uma agência que vende sites não mostra nenhuma tela de site.
- **CTA abaixo da dobra em 1366x768 (média).** Ver `hero-1366.png`.
- **Tracking de -0,045em em todos os tamanhos (média).** `index.css:89-93` aplica o mesmo valor do display ao h3, e os H3 dos pacotes ficam grudados. Há overrides com `!` espalhados (`nav.tsx`, `faq.tsx:35`, `contact.tsx:38`).
- **Pacotes sem hierarquia (média).** É o mesmo componente com o mesmo peso (`services.tsx:24-30, 78-126`). A seção ocupa cerca de 34% da página no desktop e 38% no mobile.
- **Hero e portfólio com o mesmo slider (média).** Ver `hero.tsx:181-193` vs `client-showcase.tsx:160-183`.
- **Blobs WebGL demais (média).** São 4 canvas, com tons atrás do formulário e serrilhado por renderScale 0,5–0,65. O "2 em 1" transborda o círculo (`services.tsx:114-116`) e o aro é cortado pelo `overflow-hidden` do GlowCard.
- **Polimento (baixa).** O iris e o fio decorativo aparecem em toda seção. Há cerca de 22 tamanhos de fonte sem escala, botões primários com h-12, h-13 e h-14, raios e ícones sem sistema, numeração "01-06" decorativa, `font-mono` nos contadores e caixa alta de 10,9 px. Os cards do processo estão vazios no mobile.

**Recomendação:** guardar o iris e o blob para o hero e o fechamento. Destacar o Pacote digital completo (bloco escuro dominante) e deixar o de eventos compacto. Criar tokens de tipografia com tracking proporcional ao tamanho e uma variante `pill`/`cta` única no `button.tsx`. Mostrar o produto: telas em moldura de navegador ou celular e reels verticais. Observação: devolver números ao "Como funciona" contraria uma decisão desta sessão e foi descartado.

### 3.5 Performance, SEO e publicação
**O que está bom:** 106 KB de JS gzip, 11 KB de CSS, 15 requests, fontes auto-hospedadas com preload e swap, CLS 0 e WebGL que pausa fora da tela.

**Problemas confirmados:**
- **og:image relativa e sem canonical, og:url, og:type e og:locale (alta).** Ver `index.html:11`.
- **HTML vazio sem JS (média).** `body.innerText = ""`, FCP/LCP de 2,84 s no 4G simulado e nenhum `<noscript>`. As prévias de link não dependem disso, porque as metas OG já estão no HTML estático.
- **Nenhuma medição (média).**
- **WebGL pesado no celular (média, a validar em aparelho real).** 90 passos de raymarching em `highp` (`glass-blob.tsx:32,106`), já atenuados por scale, DPR e fps.
- **Itens menores (baixa).** Sem sitemap e com soft-404 (depende do host). Sem JSON-LD (rende pouco até haver domínio e contatos). Slides ocultos baixam cedo (166 KB). O logo tem 31 KB. O texto do H1 sai grudado no `innerText`, mas os leitores de tela leem certo. Não há `_headers` de cache.

**Recomendação:** depois do domínio, metas absolutas, `sitemap.xml`, `404.html` e Search Console. `<noscript>` com nome, serviços e e-mail já. Prerender (renderToString + hydrateRoot) quando o domínio estiver definido. No `_headers`, **não** aplicar `immutable` a `/assets/*` inteiro, porque ali estão favicon, og.png e logos sem hash. Aplique só aos arquivos com hash ou mova os estáticos de pasta.

### 3.6 Negócio
**O que está bom:** proposta clara ("sites guiados e vídeos curtos", `hero.tsx:67`), prazos concretos, site e vídeo juntos num pacote, uma semente de recorrência (Edição continuada, com a Dra. Vanine usando) e mensagens pré-preenchidas por serviço.

**Problemas confirmados:**
- **Portfólio irreal (crítica)** e **canais vazios (alta)**, já descritos acima.
- **Posicionamento disperso (média).** São 5 nichos prometidos, mas toda a prova é de saúde (`content.ts:101,231,246`). O meta description não cita eventos (`index.html:7`).
- **Oferta confusa (média).** "Gravamos" (`content.ts:190`) contra "você grava" (`content.ts:133`). StoryMaker e Edição continuada se sobrepõem, e "Site completo" é vago.
- **Prazos sem condição no hero (média).** "Agenda aberta" está fixo (`hero.tsx:42`), e nada diz quantas rodadas de ajuste existem.
- **Sem âncora de preço (média).** "Sob consulta" em `services.tsx:121`, e o "+2 vídeos grátis" não tem valor de referência.
- **Pouca prova social, receita recorrente subexplorada e nada sobre pagamento, garantia ou domínio no FAQ (média).**
- **Sem cidade, região ou responsável (média).**
- **Selo "Mais escolhido" sem base (baixa).**

### 3.7 Formato e stack
**O que está bom:** site estático, gratuito para hospedar, conteúdo tipado num só arquivo e `ClientMaterial` já aceita vídeo.

**Problemas confirmados:**
- **Uma URL só, sem páginas por nicho, cases ou /eventos (média).**
- **Captura de leads frágil (média).** Sem registro dos leads, sem aviso de privacidade e dependente do Gmail.
- **Gmail e *.pages.dev (média).**
- **Nenhum vídeo no site, apesar de 3 dos 6 serviços serem de vídeo (média).**
- **Deploy sem padrão (média).**
- **Conteúdo exige editar TypeScript (baixa).**
- **O projeto pode virar template de entrega e falta uma página /links para a bio do Instagram (baixa).**

## 4. Modelo de negócio e formato

> Tudo nesta seção é **recomendação estratégica**. As hipóteses estão marcadas e precisam ser validadas com dados reais (leads, fechamentos, margem).

**Posicionamento**
- **Hipótese:** foco principal em **clínicas e consultórios particulares**, onde já existe prova ("Modelo validado em clínicas reais") e onde há indicação entre profissionais. Exemplo de headline: "Sites que agendam pacientes + vídeos para o Instagram da sua clínica". Os outros nichos entram numa linha "também atendemos".
- **Como validar:** contar por 60-90 dias o campo "nicho" do formulário e a origem no WhatsApp. Se outro nicho fechar mais, mudar o foco.
- **Eventos** é outro comprador (pessoa física, sazonal, presencial). **Hipótese:** tirar da vitrine principal e levar para uma página `/eventos`, com escopo definido (duração da cobertura, raio de atendimento, prazo de entrega) e sinal para reservar a data.

**Oferta**
- Reduzir a 4 cards com o entregável explícito: o que é, quantidade, quem grava, onde, quantas rodadas de ajuste.
- Juntar StoryMaker e Edição continuada num **plano mensal de conteúdo com níveis**.
- **Hipótese:** mostrar "a partir de R$ X" nos pacotes. O valor é decisão do Gabriel e deve sair do custo/hora. Comparar a taxa de lead para fechamento antes e depois.
- **Recorrência:** criar planos "Site no ar" (domínio, hospedagem, pequenas alterações, backup), "Conteúdo" e "Completo". Hospedar site estático custa quase nada, então a margem é alta.
- **Hipótese:** trocar ou complementar o "+2 vídeos grátis" por "1º mês de manutenção grátis", que abre a recorrência.

**Confiança**
- Prazos condicionados ("após materiais completos"), FAQ com pagamento, ajustes, propriedade do domínio e o que acontece se a prévia não agradar.
- Bloco "Quem faz", região atendida e CNPJ/MEI se houver.
- Depoimento em vídeo vertical dos 2 clientes, que serve como prova e como peça de produto ao mesmo tempo.
- **Hipótese:** 1 a 3 projetos com desconto em troca de case completo no nicho escolhido.

**Formato-alvo**
1. **Agora:** manter Vite + React. Entrar com material real, domínio, WhatsApp, medição, `_headers` e `<noscript>`.
2. **Médio prazo, se o foco em nichos se confirmar:** migrar para Astro (HTML gerado no build, com ilhas React para carrossel, formulário e GlassBlob), com `/`, `/clinicas`, `/eventos`, `/cases/<cliente>`, `/links` e `/privacidade`. Se não for criar várias páginas, um prerender da home resolve a maior parte com menos esforço. A estimativa de 2-4 dias para a migração é do revisor e não foi medida.
3. **Depois:** função própria no Cloudflare Pages com Turnstile e registro de leads (planilha ou D1), só se o volume ou o spam justificarem. Transformar o projeto em starter para os sites de clientes, começando pelo próximo cliente real.

## 5. Plano em 3 ondas

**Onda 1 – Antes de publicar ou divulgar (1-3 dias)**
- [ ] Commit e push. Tirar o projeto do OneDrive. Adicionar `.env*` ao `.gitignore`.
- [ ] Ocultar o portfólio e os cases do hero com fotos de banco (ou usar um título honesto) e **republicar para substituir a versão antiga no ar**. Pedir autorização por escrito aos clientes.
- [ ] Preencher o WhatsApp e o Instagram, ou esconder os cards e links. Trocar os rótulos que prometem um canal inexistente.
- [ ] Fazer um envio de teste e ativar o FormSubmit. Passar a usar o alias com hash. Adicionar `maxLength`.
- [ ] Aviso de privacidade junto ao botão + página `/privacidade` + rodapé com região e responsável.
- [ ] Ajustar o campo de contato (`inputMode` e autocomplete) e o foco e prazo na mensagem de sucesso.
- [ ] Ajustar o hero em 1366x768 e a pausa das animações. Trocar o selo "Mais escolhido" e condicionar os prazos.
- [ ] Ligar o deploy ao Git, criar `_headers` (CSP Report-Only e frame-ancestors) e corrigir o README.

**Onda 2 – Próximas 2 a 4 semanas**
- [ ] Registrar o domínio e configurar o Email Routing, as metas OG absolutas, o canonical, o sitemap, o `404.html` e o Search Console.
- [ ] Analytics sem cookies com eventos de conversão, UTMs na bio e planilha de leads.
- [ ] Material real: telas em moldura, reels em MP4, `url` de "Ver site no ar" e depoimentos.
- [ ] Reescrever a oferta (4 serviços com entregável explícito, FAQ com 5-6 perguntas, decidir a âncora de preço).
- [ ] UI: hierarquia entre os pacotes, iris e blob só no hero e no fechamento, tracking proporcional, variante única de botão, menos blobs.
- [ ] Higiene: apagar o código morto, ligar `noUnusedLocals`, corrigir o GlassBlob no dev, `engines` e `.nvmrc`, logo em SVG, `<noscript>`.

**Onda 3 – Depois (com dados)**
- [ ] Decidir o nicho foco e o destino de eventos com base em 60-90 dias de leads.
- [ ] Lançar os planos mensais.
- [ ] Prerender ou migração para Astro com páginas por nicho, cases e `/links`.
- [ ] JSON-LD (ProfessionalService) quando houver domínio e contatos.
- [ ] Formulário próprio com Turnstile e registro de leads, se houver spam ou volume.
- [ ] Starter para os sites de clientes. ESLint e CI.
- [ ] Validar o custo do WebGL num Android de entrada.

## 6. Refutado ou descartado

- **"Falso sucesso" do formulário antes da ativação:** o código só mostra sucesso com `success === "true"` (`contact-form.tsx:87`). O risco real é o lead ver erro.
- **H1 e H2 "grudados" para leitores de tela:** a árvore de acessibilidade lê "Sua marca, cortada e codificada para vender." e "Vamos conversar!". Só o `innerText` e o texto copiado saem grudados.
- **Prévia de link depende de prerender:** as metas OG já estão no HTML estático. O problema é só a URL relativa.
- **"Expor o e-mail" no endpoint é risco relevante:** o mesmo e-mail já aparece de propósito na página (mailto).
- **Migrar já para Pages Function + Turnstile + WAF:** desproporcional antes de existir spam.
- **HSTS em *.pages.dev:** redundante, porque o TLD .dev está na lista de preload. Só importa com domínio próprio.
- **Mudar o build para `npm ci` no Cloudflare:** provavelmente redundante, porque o Pages já usa `npm ci` quando encontra lockfile. Basta conferir no painel.
- **Regra `immutable` em `/assets/*`:** perigosa, porque congelaria por um ano o favicon, a og.png e os logos, que não têm hash.
- **WCAG 3.3.7 (Entrada redundante) no select de serviço:** forçado. É atrito, não falha de conformidade.
- **"Nenhuma ação persistente" na nav:** a nav é fixa e tem o link "Contato". O que falta é destaque no mobile.
- **"Baixa 900 px para exibir 272 px" e "sem formato adaptado":** w=900 é adequado para DPR 3, e `auto=format` já entrega WebP/AVIF.
- **Eyebrows "quase somem":** o mist sobre o fundo dá ~5,4:1 e passa AA.
- **"O aro corta o '2 em 1'":** impreciso. É o texto que transborda o círculo.
- **Devolver a numeração ao "Como funciona":** contraria uma decisão tomada nesta sessão.
- **CMS no Git (Keystatic, Decap) agora:** exagero para um site mantido por um dev só.
- **"Postar ao menos 9 peças no Instagram":** opinião sem base no projeto.