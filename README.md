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

## Customizing Tailwind

Tailwind v4 uses CSS-based configuration. Edit `src/styles/index.css` to add custom colors, fonts, and design tokens under `@theme`.

## License

ISC
