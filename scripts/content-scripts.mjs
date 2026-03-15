/**
 * Auto-discovers content scripts in src/content-scripts/
 * and builds each one using vite.config.content.ts.
 *
 * Usage:
 *   node scripts/content-scripts.mjs          # build all
 *   node scripts/content-scripts.mjs --watch   # watch all (for dev)
 */
import { readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync, spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const contentDir = resolve(root, 'src/content-scripts')

const entries = readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(resolve(contentDir, d.name, 'index.tsx')))
    .map(d => d.name)

if (entries.length === 0) {
    console.log('No content scripts found in src/content-scripts/')
    process.exit(0)
}

const watch = process.argv.includes('--watch')

if (watch) {
    // In watch mode, spawn all builds concurrently
    const children = entries.map(name => {
        console.log(`[watch] content-script: ${name}`)
        return spawn('npx', ['vite', 'build', '--watch', '--config', 'vite.config.content.ts'], {
            stdio: 'inherit',
            cwd: root,
            env: { ...process.env, CONTENT_SCRIPT_NAME: name },
            shell: true,
        })
    })

    process.on('SIGTERM', () => children.forEach(c => c.kill()))
    process.on('SIGINT', () => children.forEach(c => c.kill()))
} else {
    // In build mode, run sequentially
    for (const name of entries) {
        console.log(`[build] content-script: ${name}`)
        execSync('npx vite build --config vite.config.content.ts', {
            stdio: 'inherit',
            cwd: root,
            env: { ...process.env, CONTENT_SCRIPT_NAME: name },
        })
    }
}
