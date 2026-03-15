# React + Tailwind Chrome Extension Template

> **Updated 2026** — Fully modernized with React 19, Tailwind CSS v4, Vite 6, TypeScript 5.9, and pnpm.

A minimal, production-ready Chrome Extension (Manifest V3) template. Drop a folder, get a content script — zero config.

## Stack

- **React 19** — latest with the `react-jsx` transform (no `import React` needed)
- **Tailwind CSS v4** — CSS-first config via `@theme`, Vite plugin
- **Vite 6** — fast builds, watch mode for dev
- **TypeScript 5.9** — strict mode, bundler resolution
- **pnpm** — fast, disk-efficient package manager
- **Manifest V3** — auto-generated from `src/manifest.ts`

## Setup

```bash
pnpm install
```

Edit `package.json` to set your extension's `name`, `description`, and `version`. These feed into the generated `manifest.json`. For more control, edit `src/manifest.ts`.

## Development

```bash
pnpm dev
```

Runs both Vite configs in watch mode — the main build (popup, options, onInstalled, service worker) and the content script build. Changes rebuild automatically.

## Building

```bash
pnpm build
```

Outputs to `dist/`. Load it in Chrome: `chrome://extensions` → Developer mode → **Load unpacked** → select the `dist` folder.

## Project Structure

```
src/
├── content-scripts/       # Auto-discovered content scripts
│   └── main/              # Each folder = one content script
│       ├── index.tsx       # Entry point (required)
│       ├── App.tsx         # Your components
│       └── config.json     # { "matches": ["<all_urls>"] }
├── scripts/
│   ├── onInstalled/       # Shown on first install
│   ├── options/           # Extension options page
│   ├── popup/             # Browser action popup
│   └── service-worker/    # Background service worker
├── styles/
│   └── index.css          # Tailwind v4 config + imports
├── utils/
│   └── browser.ts         # Chrome messaging helpers
├── assets/                # Extension icons
└── manifest.ts            # Auto-generates manifest.json
```

## Quick Reload Shortcut

The template includes a `Ctrl+Space` command to reload the extension during development. Set it up at `chrome://extensions/shortcuts`.

To disable it for production, remove the `commands` block from `src/manifest.ts` and the `chrome.commands` listener from the service worker.

## Debugging Content Scripts

Content scripts are bundled as IIFE builds. To debug your source `.tsx` files:

1. Sourcemaps are enabled in dev by default (`sourcemap: 'inline'` in `vite.config.content.ts`).
2. Run `pnpm dev` to build with inline sourcemaps.
3. Open DevTools (`F12`) on any page where the content script runs.
4. **Sources** → **Page** → find the source map tree for your content script. Your original `.tsx` files appear there with full breakpoint support.
5. Or just add `debugger` statements directly in your code.

For the **service worker**, go to `chrome://extensions` → click **"Inspect views: service worker"**.

## Content Scripts (Auto-Discovery)

Content scripts are auto-discovered from `src/content-scripts/`. Each subfolder with an `index.tsx` becomes a content script — no config files to edit, no build scripts to update.

### Add a new content script

```bash
mkdir src/content-scripts/github
```

Create `src/content-scripts/github/index.tsx`:

```tsx
console.log('Running on GitHub!')
```

Optionally add `src/content-scripts/github/config.json` to control which sites it runs on:

```json
{ "matches": ["https://github.com/*"] }
```

If no `config.json` is provided, defaults to `<all_urls>`.

That's it. Run `pnpm build` — it's automatically built to `dist/js/content-github.js` and registered in the manifest.

## Customizing Tailwind

Tailwind v4 uses CSS-based configuration. Edit `src/styles/index.css` to add custom colors, fonts, and design tokens under `@theme`.

## License

ISC
