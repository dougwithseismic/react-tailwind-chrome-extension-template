import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const name = process.env.CONTENT_SCRIPT_NAME || 'main'

export default defineConfig({
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    build: {
        outDir: 'dist/js',
        cssCodeSplit: false,
        emptyOutDir: false,
        sourcemap: process.env.NODE_ENV !== 'production' ? 'inline' : false,
        lib: {
            entry: path.resolve(__dirname, `src/content-scripts/${name}/index.tsx`),
            name: name.replace(/-/g, '_'),
            formats: ['iife'],
        },
        rollupOptions: {
            output: {
                entryFileNames: `content-${name}.js`,
                extend: true,
            },
        },
    },
    plugins: [tailwindcss(), react()],
})
