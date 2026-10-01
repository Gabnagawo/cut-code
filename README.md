# Cut & Code — site-portfólio

Vite + React + TypeScript + Tailwind CSS v4, com estrutura do shadcn/ui.

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # typecheck + build estático em dist/
npm run preview   # serve o build
```

O `dist/` é estático e pode ser publicado em qualquer host (GitHub Pages, Netlify, Vercel).

## Estrutura

```
public/assets/            logo (PNG transparente), favicon, imagem OG
src/
  index.css               tokens da marca + utilitários (glass, text-sheen, bg-grid…)
  data/content.ts         todo o texto, links e imagens do site
  components/
    ui/                   componentes shadcn (button, card, carousel)
      vertical-thumbnail-slider.tsx
      vertical-thumbnail-slider-utils/carousel.tsx   slider + miniaturas (Embla)
      glow-card.tsx       cartão com hover (spotlight, borda acesa, tilt 3D, brilho)
    sections/             hero, serviços, portfólio, processo, contato
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
- **Texto e botões:** `graphite #303030`, secundário `mist #6c6c70`
- **Luz ambiente:** `mint #d9eeed`, `aqua #e3eef1` (manchas desfocadas no fundo)
- **Iridescente** (só em brilhos, bordas e destaques de texto): lilás `#c9b8ff`, água `#9fe3da`, rosa `#f4b8d8`
- **Tipografia:** Inter Tight 600 com espaçamento apertado nos títulos e Inter nos textos (fontes embutidas via `@fontsource`)
- **Detalhes:** fio fino grafite sob os títulos, vidro fosco branco nos cartões, objetos 3D de vidro cromado
  renderizados em WebGL (`src/components/ui/glass-blob.tsx`, formas `blob` e `ring`)

## Pendências (em `src/data/content.ts`)

- [ ] WhatsApp (`CONTACT.whatsapp`, ex.: `https://wa.me/55...`)
- [ ] Instagram (`CONTACT.instagram`)
- [ ] Material de clientes (`CLIENTS`): fotos/vídeos reais em `public/clientes/<slug>/` e links dos sites. Hoje são fotos provisórias do Unsplash
- [ ] Fotos/vídeos reais no slider do hero (`SHOWCASE`) e nos reels (`REELS`). Hoje são fotos do Unsplash
- [ ] Preços (hoje "Sob consulta")
- [ ] Descrição final do StoryMaker
