# Juan Oclock Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a responsive one-page portfolio for Juan Oclock that presents web and iOS work in the approved Ember Studio visual direction.

**Architecture:** A static `index.html` provides all semantic content, `styles.css` owns the complete responsive visual system and motion, and `script.js` progressively enhances the page with scroll reveals and the current year. Generated raster artwork is stored locally and never carries essential project information.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner for static verification

## Global Constraints

- Use only semantic HTML, handwritten CSS, and small vanilla JavaScript.
- Do not add React, Next.js, Tailwind, a UI library, a CSS framework, or a framework runtime.
- Brand the page as “Juan Oclock” and route every contact action to `mailto:hi@juan-oclock.com`.
- Preserve the approved near-black, ember orange/red, off-white, editorial design direction.
- Include Header, Hero, Expertise, About, Portfolio, Contact, and Footer sections on one page.
- Use the three approved fictional projects: Drift, Northstar, and Relay.
- Respect reduced-motion preferences and keep all content understandable without hover or JavaScript.

---

## File Structure

- `index.html`: page metadata, landmarks, copy, navigation, portfolio markup, contact links, and accessible image descriptions.
- `styles.css`: tokens, layout, responsive breakpoints, typography, focus states, artwork framing, and motion preferences.
- `script.js`: progressive enhancement for section reveals and the footer year.
- `assets/hero-portrait.webp`: generated ember-lit editorial developer portrait.
- `assets/og.png`: branded raster social preview derived from the finished visual language.
- `tests/site.test.mjs`: static assertions for structure, copy, contact links, assets, accessibility hooks, and framework-free delivery.
- `package.json`: local `test` and static-preview scripts using Node.js only.

### Task 1: Static Content Contract

**Files:**
- Create: `tests/site.test.mjs`
- Create: `package.json`
- Create: `index.html`

**Interfaces:**
- Consumes: the approved copy, project names, and contact address from the design specification.
- Produces: stable section IDs `about`, `work`, and `contact`; a `[data-year]` target; `.reveal` enhancement hooks; and asset references used by later tasks.

- [ ] **Step 1: Write the failing static contract test**

Create `tests/site.test.mjs` using `node:test`, `node:assert/strict`, and `node:fs/promises`. The test must read `index.html`, `styles.css`, and `script.js`; assert one `main`, the three section IDs, the headline `I build for the web &amp; the pocket.`, the names Drift, Northstar, and Relay, at least two `mailto:hi@juan-oclock.com` links, a skip link, image `alt` text, `prefers-reduced-motion`, visible `:focus-visible` styling, and no React/Next/Tailwind strings or external script/style URLs.

- [ ] **Step 2: Run the test and confirm it fails on missing product files**

Run: `node --test tests/site.test.mjs`

Expected: FAIL because `index.html`, `styles.css`, and `script.js` do not exist.

- [ ] **Step 3: Add the framework-free project scripts**

Create `package.json` with `private: true`, `type: "module"`, `test: "node --test tests/site.test.mjs"`, and `start: "python3 -m http.server 4173"`. Do not declare dependencies or devDependencies.

- [ ] **Step 4: Author the complete semantic page**

Create `index.html` with:

- English language and responsive viewport metadata;
- title `Juan Oclock — Web & iOS Developer` and a concise description;
- local `styles.css`, local `script.js` with `defer`, favicon data URI, and `assets/og.png` sharing metadata;
- skip link and a compact header with wordmark, About/Work/Contact anchors, and email CTA;
- hero headline, supporting copy, work/email actions, portrait image, and small availability note;
- four-item expertise strip;
- concise About copy and two practice-stat callouts;
- three portfolio articles for Drift, Northstar, and Relay with platform labels, outcomes, and decorative CSS mockup canvases;
- a Contact section and footer with `[data-year]`.

All meaningful links must work with HTML alone, and all headings must follow a logical hierarchy.

- [ ] **Step 5: Run the contract test and observe only style/script assertions remain**

Run: `npm test`

Expected: FAIL because `styles.css` and `script.js` have not been implemented.

- [ ] **Step 6: Commit the semantic foundation**

```bash
git add index.html package.json tests/site.test.mjs
git commit -m "feat: add semantic portfolio content"
```

### Task 2: Ember Visual System and Generated Artwork

**Files:**
- Create: `styles.css`
- Create: `assets/hero-portrait.webp`
- Create: `assets/og.png`
- Modify: `index.html`

**Interfaces:**
- Consumes: section classes and enhancement hooks from `index.html`.
- Produces: a responsive visual system that remains usable without JavaScript and two local raster assets referenced by page metadata and hero markup.

- [ ] **Step 1: Generate and inspect the hero artwork**

Generate one portrait-oriented editorial image of a creative developer in profile, anonymous and non-identifying, with deep black shadows, warm orange-red rim lighting, a minimal studio background, and enough negative space for cropping. Save the validated result as `assets/hero-portrait.webp`; reject artwork containing text, logos, extra faces, or malformed anatomy.

- [ ] **Step 2: Implement the complete CSS system**

Create `styles.css` with:

- tokens for `#0b0b0b`, `#141414`, `#f3efe8`, muted text, ember orange, and ember red;
- a system sans stack, fluid display sizes with `clamp()`, and a centered maximum-width shell;
- a skip link, strong `:focus-visible` outlines, 44px minimum interactive targets, and selection colors;
- an atmospheric hero gradient with rounded lower corners, editorial split grid, image treatment, and small orbit/accent details made only with CSS;
- an expertise strip, asymmetric About grid, and three responsive project cards with CSS-rendered phone/browser/product mockups;
- understated hover states gated by pointer capability;
- scroll-reveal defaults that show all content and only hide transformed items when the root has `.js`;
- responsive breakpoints at 900px and 640px;
- a `prefers-reduced-motion: reduce` block that disables smooth scrolling, transitions, transforms, and reveal delays.

- [ ] **Step 3: Create and wire the social preview image**

Create a 1200×630 branded raster card in `assets/og.png` using the ember gradient, “Juan Oclock”, and “Web & iOS Developer”. Confirm the exact visible spelling before retaining it, then ensure `index.html` references the local asset in Open Graph and X metadata without adding an invented production domain.

- [ ] **Step 4: Run the static contract test**

Run: `npm test`

Expected: FAIL only on the missing JavaScript enhancement behavior.

- [ ] **Step 5: Commit the visual system**

```bash
git add index.html styles.css assets/hero-portrait.webp assets/og.png
git commit -m "feat: add ember portfolio visual system"
```

### Task 3: Progressive Enhancement and Verification

**Files:**
- Create: `script.js`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `.reveal` elements and `[data-year]` from `index.html` plus `.js`/`.is-visible` states from `styles.css`.
- Produces: a no-dependency enhancement that marks the page JavaScript-enabled, reveals content with `IntersectionObserver`, and writes the current year.

- [ ] **Step 1: Implement minimal enhancement JavaScript**

Create `script.js` that adds `.js` to `document.documentElement`, writes `new Date().getFullYear()` into every `[data-year]`, reveals all `.reveal` nodes immediately when reduced motion is requested or `IntersectionObserver` is unavailable, otherwise observes them with `threshold: 0.12` and `rootMargin: "0px 0px -8% 0px"`, adds `.is-visible`, and unobserves each revealed node.

- [ ] **Step 2: Complete behavioral test assertions**

Extend `tests/site.test.mjs` to assert `script.js` includes `IntersectionObserver`, a reduced-motion query, `.is-visible`, and year handling, while continuing to assert there are no imports, network requests, dependencies, or framework identifiers.

- [ ] **Step 3: Run the complete test suite**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 4: Run a local HTTP smoke test**

Run the static server on port 4173, request `/`, `/styles.css`, `/script.js`, `/assets/hero-portrait.webp`, and `/assets/og.png`, and confirm each returns HTTP 200 with the expected content type.

- [ ] **Step 5: Inspect final scope and repository status**

Run: `rg -n "react|next|tailwind|TODO|TBD|FIXME" index.html styles.css script.js package.json tests/site.test.mjs`

Expected: no framework or placeholder matches. Then run `git status --short` and confirm only intended files are present.

- [ ] **Step 6: Commit the verified site**

```bash
git add script.js tests/site.test.mjs
git commit -m "feat: complete vanilla portfolio interactions"
```

### Task 4: Publish and Handoff

**Files:**
- Modify only if required by the selected static hosting target.

**Interfaces:**
- Consumes: the verified static site root.
- Produces: a public URL serving the exact tested HTML, CSS, JavaScript, and raster assets.

- [ ] **Step 1: Package the static site without adding a framework**

Include only `index.html`, `styles.css`, `script.js`, `assets/hero-portrait.webp`, and `assets/og.png` in the deployable output.

- [ ] **Step 2: Publish with the available static hosting path**

Deploy the packaged static files. Do not introduce a framework or rewrite the implementation to satisfy a hosting provider.

- [ ] **Step 3: Verify the deployed root**

Request the deployed URL and confirm HTTP 200, the title `Juan Oclock — Web & iOS Developer`, local assets loading successfully, and contact links targeting `hi@juan-oclock.com`.

- [ ] **Step 4: Return the deployed URL and concise handoff**

Provide the public URL as the primary deliverable and mention that portfolio copy and imagery are placeholders designed for easy replacement.
