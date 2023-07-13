# dougwithseismic/react-tailwind-chrome-extension-template 🔥

So, you want to build modern web extensions with React & Tailwind? Step on in. This is the starting point for all my browser extensions, including Promptheus, which lets over 28,000 weekly users talk to ChatGPT with their voice.

Why do we need another extension boilerplate? Because v3 manifest! At time of writing, nothing out there comes as simple as this to working - If I can help just one person launch their extension then this project is a complete success in my eyes.

## 1. Setup

First off, give this a star! It costs nothing, and it helps more developers get started with products, faster. Let's lift one another up here.

### i. Project Setup

Start by installing your dependencies as usual. We're using Vite to build and React and Tailwind for everything. If you're used to modern web development then you'll have no problem working with this project. I built this boilerplate to match as closely as possible to the experience I'd expect when building web apps with React.

```bash
npm install
```

### ii. Edit package.json

Head over to `package.json` and edit your name, longName and description to match your project. These are used to generate `manifest.json`. For more control over the manifest output, you can edit `src/manifest.ts`

## Project Overview

```bash
web-extension-boilerplate-23/
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── dist/
├── node_modules/
├── src/
│   ├── scripts/
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

```bash
npm run dev
```

This spins up a local vite server and opens the browser to a page that injects your extension, popup, options and content script. As a note, the `service-worker` background script, as well as Browser runtimes for `content.ts` (sending/receiving messages, storage etc) aren't available here, as you'll need to build and load the extension into Chrome. More on that later.

You'll find everything you need to get building in `src/scripts/...` so here's a quick overview to get you going.

- `src/scripts/content/*` - Your content script. What gets injected into a client's tab. index.tsx is where the magic happens in traditional React rendering fashion, and `App.tsx` is your entry point into your app.

- `src/scripts/onInstalled` - When first installed, this page gets shown. Take the opportunity to spell out exactly how to use your extension and all the benefits, as well as what to do if there are issues (the default for most users with problems is to review bomb your store page, so give them an alternate way to reach out)

- `src/scripts/options` - The options tab. Self explanatory; When your extension has loaded, right click the extensions icon in the top right of browser and hit `options`.

- `src/scripts/popup` - The popup, that's shown with a left click of the extensions icon. If you're not injecting into a webpage, here's a great place to put the bulk of your UI.

- `src/scripts/service-worker` - The background script. Check out the examples on how to pass messages back and forth between Content and Background script. It should consist mainly of helper functions and listeners for specific events. You can debug this by heading over to `chrome://extensions` and clicking the `inspect service worker` link, that will open up a new devtools env specifically for the background script.

## Building, Bundling and Shipping 🚢

**READ THIS NEXT SECTION CAREFULLY BECAUSE THERE ARE SOME TIPS THAT WILL SAVE YOU TIME WHILST DEVELOPING YOUR EXTENSION!

To get your extension running on Chrome, you'll need to do a couple (easy) steps. Firstly, run the build command, which uses vite to build and output to the `dist` folder.

```bash
npm run build
```

From here, open Chrome and go to `chrome://extensions`, then hit `Load Unpacked` and choose the newly made `dist` directory. Assuming no errors, voila! You're in.

You'll notice that `npm run build` calls on two vite configs, one for your `content` script, and another for everything else. The reasoning for this is that we're having to output two very different builds (a normal 'vite'-ish HTML build, and a library (the `content` script)).

You'll also notice that we're watching for changes on the content script so that it rebuilds every time we make a change there. (`vite.config.content.ts` > watch to make edits.) This should make the annoying task of rebuilding, and reloading your extension, slightly easier.

### Protip: Quick Reloading Shortcut

TL;DR - Head to `chrome://extensions/shortcuts` and set your shortcut to Refresh Extension. WITHOUT DOING THIS, SHORTCUTS WONT WORK :)

Heading to `chrome://extensions` and hitting the reload button every time I wanted to make a simple change was a nonsustainable headache so I added a shortcut `Ctrl + Space` (defaults to Command + Space for Mac) that reloads the extension in the same way.

If you want to edit / disable this (and it could be a good idea to do so for production ships) then comment out the `commands` section on `src/manifest.ts`, or remove the `Chrome.commands` mentions from `src/scripts/service-worker/service-worker.ts` More here. [https://developer.chrome.com/docs/extensions/reference/commands/](https://developer.chrome.com/docs/extensions/reference/commands/)

Using `npm run build` with the watcher, and the Quick Reload Shortcut, you can get pretty close to a seamless hot-reloading experience, though its not perfect. Any ideas to make this more fluid are welcome!

## Need help?

Follow me on [twitter.com/dougiesilkstone](https://twitter.com/dougiesilkstone) and drop me a message, and please do submit a PR to help improve! I'll be running a week long hackathon to build and launch an extension project from start to finish, so if you're interested in joining, follow for more info.

I'm here to help. It's what I enjoy the most (aside from shipping products, obviously). Reach out, always.
