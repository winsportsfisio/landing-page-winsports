# WIN SPORTS Fisioterapia Esportiva — Landing Page

Landing page institucional para a **WIN SPORTS Fisioterapia Esportiva**, clínica de fisioterapia esportiva no bairro Balneário, Estreito, Florianópolis/SC.

- **Produção:** https://winsportsfisio.com.br
- **Responsável técnico:** Pedro Leonardo dos Reis — CREFITO-10/SC nº 362790-F
- **Status:** código pronto, validado em build local, aguardando deploy

---

## Sumário

- [Stack](#stack)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Fonte da verdade do conteúdo](#fonte-da-verdade-do-conteúdo)
- [Compliance](#compliance)
- [Sistema de animações](#sistema-de-animações)
- [Performance](#performance)
- [Deploy](#deploy)
- [Roadmap](#roadmap)
- [Documentação adicional](#documentação-adicional)

---

## Stack

- **Framework:** [Astro 4.16](https://astro.build) — HTML pré-renderizado, zero JS por padrão
- **Estilos:** Tailwind v3 via `@astrojs/tailwind` ([tailwind.config.mjs](tailwind.config.mjs))
- **Componentes interativos:** React 18 — apenas 2 islands
  - `FAQ.tsx` (accordion acessível com `client:visible`)
  - `CookieBanner.tsx` (Consent Mode v2 com `client:idle`)
- **Sitemap:** `@astrojs/sitemap@3.2.1` (pinned — 3.5+ quebra em Astro 4)
- **TypeScript:** strict
- **Sem testes automatizados** — landing estática, validação é manual + Lighthouse

---

## Como rodar localmente

Pré-requisitos: **Node 18+** e **npm**.

```bash
npm install
npm run dev          # dev server em http://localhost:4321
npm run build        # gera dist/ (HTML estático + sitemap)
npm run preview      # serve dist/ localmente (smoke test pós-build)
```

---

## Estrutura do projeto

```
src/
├── data/
│   └── site.ts                  # ← fonte da verdade: endereço, contato, FAQs
├── layouts/
│   └── BaseLayout.astro         # <head>, SEO, JSON-LD, Consent Mode defaults,
│                                #   IntersectionObserver do reveal-on-scroll
├── components/
│   ├── Header.astro             # navbar sticky + menu mobile vanilla JS
│   ├── Hero.astro               # hero com light streaks ancorados ao conteúdo
│   ├── HowWeWork.astro          # metodologia (4 passos)
│   ├── Services.astro           # especialidades (6 cards)
│   ├── ReturnToPlay.astro       # seção destaque + "5,0 no Google"
│   ├── About.astro              # sobre + responsável técnico (COFFITO)
│   ├── FAQSection.astro         # wrapper que monta <FAQ client:visible />
│   ├── FAQ.tsx                  # React island
│   ├── Testimonials.astro       # 3 cards narrativos 3ª pessoa
│   ├── FinalCTA.astro           # CTA duplo (agendar + tirar dúvida)
│   ├── Contact.astro            # cards de contato + iframe Google Maps
│   ├── Footer.astro             # NAP + CREFITO + CNPJ + links legais
│   ├── WhatsAppFloat.astro      # botão flutuante fixo bottom-right
│   └── CookieBanner.tsx         # React island — Consent Mode v2
├── pages/
│   ├── index.astro              # landing
│   └── politica-de-privacidade.astro
└── styles/
    └── global.css               # Tailwind base + utilities + animações

public/
├── favicon.ico, favicon.svg, favicon-96x96.png, apple-touch-icon.png
├── web-app-manifest-192x192.png, web-app-manifest-512x512.png
├── logo.png                     # logo oficial do cliente (sem fundo)
├── hero-placeholder.svg         # hero inline + preload
├── og-image.jpg                 # 1200×630 — placeholder
├── robots.txt
└── site.webmanifest
```

---

## Fonte da verdade do conteúdo

Todos os dados do negócio (endereço, WhatsApp, CREFITO, FAQs, horários, etc.) estão centralizados em [src/data/site.ts](src/data/site.ts). **Nunca hardcode** esses valores diretamente nos componentes — importe de `site`.

O wireframe textual com os copys aprovados pelo cliente está em [wireframe-winsports.md](wireframe-winsports.md).

---

## Compliance

A landing foi construída respeitando três camadas regulatórias:

### COFFITO Resolução 532/2021 (publicidade em fisioterapia)

- ❌ **Sem preços** no site nem `priceRange` no JSON-LD
- ❌ **Sem `aggregateRating`** no JSON-LD (a nota 5,0 do Google aparece só visualmente)
- ❌ **Sem promessa de resultado** (foco em descrever processo)
- ❌ **Sem depoimentos identificáveis** — apenas narrativa em 3ª pessoa com perfis representativos
- ✅ **Responsável técnico identificado** em About, Footer e no `employee` do JSON-LD

### LGPD (Lei 13.709/2018)

- Site **estático, sem formulários** — sem coleta direta de dados pessoais
- **Consent Mode v2** com defaults negados antes de qualquer tag Google carregar
- **Banner opt-in** com granularidade (analytics vs. ads separados)
- Cookie `ws_consent` persistente por 365 dias
- Política de Privacidade exaustiva em `/politica-de-privacidade`

### Acessibilidade (WCAG 2.1 AA)

- Único `<h1>` por página, hierarquia `h2 > h3` validada
- `aria-label` em CTAs, `alt` descritivos em imagens reais e `alt=""` em decorativas
- FAQ com `aria-expanded` + `aria-controls` + `role="region"`
- Skip link "Pular para o conteúdo principal"
- Focus ring visível (outline ciano 3px)
- Contraste mínimo 4.5:1

---

## Sistema de animações

Reveal-on-scroll global via `IntersectionObserver` definido em [BaseLayout.astro](src/layouts/BaseLayout.astro). Elementos com classe `.reveal` ganham `.is-visible` quando 12% entram no viewport (com `rootMargin: '0px 0px -40px 0px'`).

**Variantes do vetor de entrada:**

| Classe | Movimento | Uso |
|---|---|---|
| `.reveal` | fade + deslize vertical (24px) | Padrão — texto corrido, headers, badges |
| `.reveal.reveal-left` | fade + slide da esquerda (32px) | Coluna esquerda em layout 2-col |
| `.reveal.reveal-right` | fade + slide da direita (32px) | Coluna direita em layout 2-col |
| `.reveal.reveal-scale` | fade + zoom-in (0.94 → 1) | Cards com ícone ou quote |

Stagger via custom property: `style="--reveal-delay: 100ms"`. Mesma curva (`cubic-bezier(0.22, 1, 0.36, 1)`) e duração (`0.7s`) em todas as variantes.

**Light streaks do hero:** ancoradas no fluxo do conteúdo (`.hero-streak-row`) em vez de via `top: X%` na seção — mantém a posição vertical em qualquer viewport. Detalhes em [CLAUDE.md §5.6](CLAUDE.md).

---

## Performance

Metas Lighthouse mobile (validação pós-deploy):

| Métrica | Meta |
|---|---|
| LCP | < 2,5s |
| INP | < 200ms |
| CLS | < 0,1 |
| Performance | ≥ 95 |
| Acessibilidade | 100 |
| SEO | 100 |
| Best Practices | 100 |

**Estratégias aplicadas:**

- Hero SVG inline + preload com `fetchpriority="high"`
- Critical CSS inline automático (via `inlineStylesheets: 'auto'`)
- Fontes Inter com `display=swap` + preconnect
- Zero framework JS em produção (React só nas 2 islands, hidratação sob demanda)
- Tailwind purge automático no build

---

## Deploy

Qualquer host de HTML estático funciona. Recomendados: **Vercel**, **Netlify** ou **Cloudflare Pages** — todos aceitam Astro `output: static` sem configuração adicional.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18+

Após o deploy, apontar `winsportsfisio.com.br` (+ `www`) para o host e rodar Lighthouse mobile conferindo as metas acima.

---

## Roadmap

| Fase | Escopo | Estado |
|---|---|---|
| 1–3 | Código (landing + Política de Privacidade + compliance) | ✅ Concluído |
| 4 | Google Business Profile | ⏳ Aguardando cliente |
| 5 | Google Search Console + GA4 (Consent Mode v2 já plumbed) | ⏳ Aguardando cliente |
| 6 | Google Ads (tag via CookieBanner) | ⏳ Aguardando cliente |

**Pendências marcadas `SUBSTITUIR DEPOIS` no código:**

- `og-image.jpg` — placeholder programático, trocar por arte final
- Foto real no About (hoje é SVG decorativo)
- API key do Maps Embed (hoje usa embed clássico sem key)
- Data de `lastUpdate` da Política no deploy
- Versão light monocromática oficial do logo no Footer (hoje usa filter `brightness-0 invert`)

---

## Documentação adicional

- **[CLAUDE.md](CLAUDE.md)** — contexto técnico detalhado para sessões de desenvolvimento assistido por IA (convenções, decisões de arquitetura, armadilhas conhecidas)
- **[wireframe-winsports.md](wireframe-winsports.md)** — wireframe de conteúdo com copy aprovado pelo cliente e alinhamentos de sessões anteriores

---

## Créditos

Desenvolvido por **Matheus Favaretto** para a **Win Sports Fisioterapia LTDA** · CNPJ 66.332.988/0001-02.
