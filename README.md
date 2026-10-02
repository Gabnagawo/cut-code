# Cut Code — site-portfólio

Vite + React + TypeScript + Tailwind CSS v4, com estrutura do shadcn/ui.

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # typecheck + build estático em dist/
npm run preview   # serve o build
```

O `dist/` é estático. O site está no **Cloudflare Pages** (projeto `cut-code`, https://cut-code.pages.dev):

```bash
npm run build && npx wrangler pages deploy dist --project-name cut-code
```

`public/_headers` define os cabeçalhos de segurança (CSP etc.). Ao adicionar um serviço externo
(analytics, player de vídeo, outro formulário), libere o domínio dele na CSP.

## Estrutura

```
public/assets/            logo (PNG transparente), favicon, imagem OG
public/privacidade.html   política de privacidade (link no formulário e no rodapé)
public/_headers           cabeçalhos de segurança do Cloudflare Pages
src/
  index.css               tokens da marca + utilitários (glass, text-sheen, bg-grid…)
  data/content.ts         todo o texto, links e imagens do site
  components/
    ui/                   componentes shadcn (button, card, carousel)
      vertical-thumbnail-slider.tsx
      vertical-thumbnail-slider-utils/carousel.tsx   slider + miniaturas (Embla)
      glow-card.tsx       cartão com hover (spotlight, borda acesa, tilt 3D, brilho)
    sections/             hero, serviços, portfólio, processo, dúvidas (FAQ), contato + formulário
  demos/                  demo do vertical-thumbnail-slider
```

### Por que `src/components/ui`?

É o caminho padrão do shadcn (`components.json` → alias `@/components/ui`). O CLI
(`npx shadcn@latest add <componente>`) instala novos componentes ali, e os componentes
da comunidade (21st.dev etc.) importam de `@/components/ui/...`. Manter essa pasta faz
esses componentes funcionarem sem ajustar imports.

## Identidade visual

Baseada na apresentação "White 3D Glass" + liquid glass + mercury.com.

- **Fundo:** `canvas #f1f1f1`, superfícies `paper #f8f8f7`
- **Texto e botões:** `graphite #303030`, secundário `mist #616165` (contraste ≥ 4,9:1 em todos os fundos do site)
- **Luz ambiente:** `mint #d9eeed`, `aqua #e3eef1` (manchas desfocadas no fundo)
- **Iridescente** (só em brilhos, bordas e destaques de texto): lilás `#c9b8ff`, água `#9fe3da`, rosa `#f4b8d8`
- **Tipografia:** Inter Tight 600 com espaçamento apertado nos títulos e Inter nos textos (subconjunto latino em `public/fonts/`, pré-carregado no `index.html`)
- **Detalhes:** fio fino grafite sob os títulos, vidro fosco branco nos cartões, objetos 3D de vidro cromado
  renderizados em WebGL (`src/components/ui/glass-blob.tsx`, formas `blob` e `ring`)

## Regras de design aplicadas

- **Espaçamento** na escala de 8 px: margem lateral 16 px no mobile e 24 px a partir de `sm`; 64 px entre seções no mobile e 96 px no desktop; gaps de grade 16/24 px; padding de card 24/32 px
- **Tipografia:** corpo com no mínimo 16 px; títulos de seção com entrelinha 1,05; espaçamento negativo forte (-0,045em) só nos títulos grandes, e quase neutro nos pequenos (FAQ, menu, marca)
- **Movimento:** tokens em `index.css` (`--dur-short` 150 ms, `--dur-medium` 300 ms, `--dur-long` 500 ms; curvas `--ease-standard`, `--ease-enter`, `--ease-exit`). Hover entre 150 e 300 ms; reveal ao rolar em 500 ms, só com transform e opacity; entrada do hero completa em cerca de 1,2 s. Carrossel do hero troca a cada 7 s, pausa no hover e no foco e tem botão "Pausar"; a faixa de nichos também tem pausa; as palavras rotativas dão uma volta e param (WCAG 2.2.2). `prefers-reduced-motion` desliga tudo, inclusive a rolagem suave
- **Cor:** o grafite sólido fica para o que é clicável; ícones informativos usam contorno claro. O gradiente iridescente dos títulos é estático
- **Ações:** o mesmo termo em todo o site ("Pedir orçamento"); o rótulo da ação aparece sempre nos cards, não só no hover; nada de botão de play onde nada toca
- **Acessibilidade:** link "Pular para o conteúdo"; `scroll-padding-top` para o header fixo não cobrir o foco; botão "Menu" com texto; alvos de 44 px no mobile (header, rodapé, FAQ)

## Qualidade (revisão de design)

Medido com Lighthouse e axe-core no build de produção (antes da revisão de design de outubro de 2026; vale medir de novo):

| | Mobile | Desktop |
|---|---|---|
| Performance | 94 | 98 |
| Acessibilidade | 100 | 100 |
| SEO | 100 | 100 |

Sem estouro horizontal de 320 px a 1920 px. Ao mexer no layout, vale repetir essas verificações.

## Pendências (em `src/data/content.ts`)

- [x] WhatsApp (`CONTACT.whatsappNumber`, só números com DDI e DDD, ex.: `5511999999999`). Todos os botões de orçamento passam a abrir o WhatsApp com mensagem pronta (cada serviço com a sua). Enquanto estiver vazio, levam à seção de contato
- [x] Instagram (`CONTACT.instagram`). Enquanto WhatsApp e Instagram estiverem vazios, os cards deles não aparecem
- [ ] Material de clientes (`CLIENTS`): fotos/vídeos reais em `public/clientes/<slug>/`, links dos sites e **autorização do cliente**. Só então marque `ready: true`; sem nenhum cliente pronto, a seção Portfólio fica fora do site e do menu
- [ ] Fotos/vídeos reais no slider do hero (`SHOWCASE`). Hoje são fotos do Unsplash, com o aviso "Imagens ilustrativas"
- [ ] Formulário: fazer um envio de teste no site publicado e clicar no link de ativação que o FormSubmit manda para `CONTACT.email`. Depois, trocar o e-mail do endpoint em `contact-form.tsx` pelo código aleatório que o FormSubmit fornece
- [ ] Preços (hoje "Sob consulta")
- [ ] Depoimentos de clientes com nome e foto (prova social; ainda não há seção porque precisa de depoimentos reais)
- [ ] Revisar as respostas da FAQ (`FAQ` em `content.ts`), escritas só com o que já está no site
- [ ] Descrição final do StoryMaker
- [ ] Domínio próprio: trocar `https://cut-code.pages.dev` no `index.html` (canonical, `og:url`, `og:image`) e em `public/privacidade.html`, e adicionar `sitemap.xml`
- [ ] Revisar a política de privacidade (`public/privacidade.html`) e incluir CNPJ/MEI e cidade, se houver
