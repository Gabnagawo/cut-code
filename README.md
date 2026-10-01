# Cut & Code — site-portfólio

Site estático (HTML + CSS + JS puro, sem build). Para ver, abra `index.html` no navegador
ou publique a pasta em qualquer host estático (GitHub Pages, Netlify, Vercel).

## Identidade visual

- **Referências:** liquid glass (glassmorphism) + mercury.com
- **Cores** (derivadas da logo monocromática):
  - `--ink #08080a` (fundo) · `--bone #f3f1ec` (texto/botão principal) · `--mist #a7a7b3` (texto secundário)
  - Reflexos do vidro: `--pearl #c9c3ff` (lavanda) · `--ice #9fd8ff` (azul gelo) · `--blush #f5c9d8`
- **Tipografia:** Instrument Serif (títulos, ecoa o serifado da logo) + Inter (textos)

## Estrutura

`index.html` · `styles.css` · `script.js` · `assets/` (logo em PNG transparente, favicon, imagem de compartilhamento)

Seções: Hero → Nichos → Serviços (pacote em destaque com +2 vídeos) → Portfólio (sites + reels) → Como funciona → Contato

## Pendências (marcadas com `data-placeholder` / `TODO` no HTML)

- [ ] Número de WhatsApp (`https://wa.me/55...`)
- [ ] @ do Instagram
- [ ] Links dos sites da Clínica Santa Lourdes e da Dra. Vanine (e prints reais em `assets/`)
- [ ] Reels reais: trocar cada `.reel-inner` por `<video>` ou embed do Instagram
- [ ] Preços (hoje aparece "Sob consulta")
- [ ] Descrição final do StoryMaker
