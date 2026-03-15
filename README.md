# React + Tailwind Chrome Extension Template

> **Updated 2026** — Fully modernized with React 19, Tailwind CSS v4, Vite 6, TypeScript 5.9, and pnpm.

A minimal, production-ready Chrome Extension (Manifest V3) template. No bloat, no magic — just a clean starting point.

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
├── scripts/
│   ├── content/          # Injected into pages (Shadow DOM in production)
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── onInstalled/      # Shown on first install
│   │   ├── index.tsx
│   │   └── onInstalled.html
│   ├── options/           # Extension options page
│   │   ├── Options.tsx
│   │   ├── index.tsx
│   │   └── options.html
│   ├── popup/             # Browser action popup
│   │   ├── Popup.tsx
│   │   ├── index.tsx
│   │   └── popup.html
│   └── service-worker/    # Background service worker
│       └── service-worker.ts
├── styles/
│   └── index.css          # Tailwind v4 config + imports
├── utils/
│   └── browser.ts         # Chrome messaging helpers
├── assets/                # Extension icons
└── manifest.ts            # Generates manifest.json
```

## Quick Reload Shortcut

The template includes a `Ctrl+Space` command to reload the extension during development. Set it up at `chrome://extensions/shortcuts`.

To disable it for production, remove the `commands` block from `src/manifest.ts` and the `chrome.commands` listener from the service worker.

## Debugging Content Scripts

Content scripts are bundled into a single `content.js` via the IIFE build. To debug your source `.tsx` files:

1. In `vite.config.content.ts`, sourcemaps are enabled in development by default (`sourcemap: 'inline'`).
2. Run `pnpm dev` so the content script builds with inline sourcemaps.
3. Open any page where the content script runs, then open DevTools (`F12`).
4. Go to **Sources** → **Page** → look under the `content.js` source map tree. Your original `.tsx` files will appear there and you can set breakpoints directly.
5. Alternatively, add `debugger` statements in your content script code — Chrome will pause execution when DevTools is open.

For the **service worker**, go to `chrome://extensions`, find your extension, and click **"Inspect views: service worker"** to open a dedicated DevTools window.

## Multiple Content Scripts

To run different content scripts on different sites:

1. Create a new directory under `src/scripts/` (e.g., `src/scripts/content-github/`).
2. Add your entry `index.tsx` and components there.
3. Create a new Vite config (e.g., `vite.config.content-github.ts`) based on `vite.config.content.ts`, pointing to your new entry and outputting a different filename:

```ts
// vite.config.content-github.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') },
    build: {
        outDir: 'dist/js',
        emptyOutDir: false,
        lib: {
            entry: path.resolve(__dirname, 'src/scripts/content-github/index.tsx'),
            name: 'contentGithub',
            formats: ['iife'],
        },
        rollupOptions: { output: { entryFileNames: 'content-github.js', extend: true } },
    },
    plugins: [tailwindcss(), react()],
})
```

4. Register it in `src/manifest.ts` under `content_scripts`:

```ts
content_scripts: [
    { matches: ['<all_urls>'], js: ['./js/content.js'] },
    { matches: ['https://github.com/*'], js: ['./js/content-github.js'] },
],
```

5. Add the build command to your scripts in `package.json`:

```json
"dev": "concurrently \"vite build --watch\" \"vite build --watch --config vite.config.content.ts\" \"vite build --watch --config vite.config.content-github.ts\"",
"build": "tsc -b && vite build && vite build --config vite.config.content.ts && vite build --config vite.config.content-github.ts"
```

## Customizing Tailwind

Tailwind v4 uses CSS-based configuration. Edit `src/styles/index.css` to add custom colors, fonts, and design tokens under `@theme`.

## License

ISC
