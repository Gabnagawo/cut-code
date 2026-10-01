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

- **Referências:** liquid glass (glassmorphism) + mercury.com
- **Cores:** `ink #08080a` · `bone #f3f1ec` · `mist #a7a7b3` · reflexos `pearl #c9c3ff`, `ice #9fd8ff`, `blush #f5c9d8`
- **Tipografia:** Instrument Serif (títulos) + Inter (textos)

## Pendências (em `src/data/content.ts`)

- [ ] WhatsApp (`CONTACT.whatsapp`, ex.: `https://wa.me/55...`)
- [ ] Instagram (`CONTACT.instagram`)
- [ ] Links dos sites da Clínica Santa Lourdes e da Dra. Vanine (`CASES[].url`)
- [ ] Fotos/vídeos reais no slider do hero (`SHOWCASE`) e nos reels (`REELS`). Hoje são fotos do Unsplash
- [ ] Preços (hoje "Sob consulta")
- [ ] Descrição final do StoryMaker
