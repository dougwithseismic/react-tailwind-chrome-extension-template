# A minimal v3 manifest web extension boilerplate with React + Tailwind + HMR 🔥

So, you want to build modern web extensions with React & Tailwind? Step on in. This is the starting point for all my browser extensions, including Promptheus, which lets over 28,000 weekly users talk to ChatGPT with their voice.

## 1. Setup

### npm install

### Edit package.json

### Edit Manifest

```bash
web-extension-boilerplate-23/
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── dist/
├── node_modules/
├── src/
│   ├── scripts/
│   │   ├── background
│   │       └── index.ts
│   │   └── content
│   │       └── App.tsx
│   │       └── index.tsx
│   │   └── onInstalled
│   │       └── App.tsx
│   │       └── index.tsx
│   │       └── onInstalled.html
│   │   └── options
│   │       └── Options.tsx
│   │       └── index.tsx
│   │       └── options.html
│   │   └── popup
│   │       └── Popup.tsx
│   │       └── index.tsx
│   │       └── popup.html
│   │   └── service-worker
│   │       └── service-worker.tsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   └── browser.ts
│   ├── index.html
│   ├── manifest.ts # Generates Manifest.json
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
