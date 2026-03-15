import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { fileURLToPath } from 'url'
import { writeManifest } from './src/manifest'
import * as path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rollupInput = getRollupInput([
    './src/scripts/options/options.html',
    './src/scripts/popup/popup.html',
    './src/scripts/onInstalled/onInstalled.html',
    './src/scripts/service-worker/service-worker.ts',
])

function getRollupInput(files: string[]) {
    return files.reduce<Record<string, string>>((acc, file) => {
        acc[path.basename(file, path.extname(file))] = fileURLToPath(
            new URL(file, import.meta.url)
        )
        return acc
    }, {})
}

export default defineConfig({
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    base: '',
    build: {
        rollupOptions: {
            input: rollupInput,
            output: {
                entryFileNames: 'js/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
    plugins: [
        tailwindcss(),
        react(),
        viteStaticCopy({
            targets: [{ src: './src/assets/*', dest: './assets' }],
        }),
        {
            name: 'postbuild-manifest',
            closeBundle: async () => {
                await writeManifest()
            },
        },
    ],
})
