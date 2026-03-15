import fs from 'node:fs'
import path from 'node:path'

interface ContentScriptConfig {
    matches: string[]
}

interface Manifest {
    manifest_version: number
    name: string
    version: string
    description: string
    action: { default_popup: string }
    options_ui: { page: string; open_in_tab: boolean }
    background: { service_worker: string; type: string }
    icons: Record<string, string>
    permissions: string[]
    content_scripts: Array<{ matches: string[]; js: string[] }>
    web_accessible_resources?: Array<{ matches: string[]; resources: string[] }>
    commands?: Record<
        string,
        {
            suggested_key: { default: string; mac?: string }
            description: string
        }
    >
}

function discoverContentScripts(): Array<{ matches: string[]; js: string[] }> {
    const contentDir = path.resolve('src/content-scripts')
    if (!fs.existsSync(contentDir)) return []

    return fs
        .readdirSync(contentDir, { withFileTypes: true })
        .filter(d => d.isDirectory() && fs.existsSync(path.join(contentDir, d.name, 'index.tsx')))
        .map(d => {
            const configPath = path.join(contentDir, d.name, 'config.json')
            const config: ContentScriptConfig = fs.existsSync(configPath)
                ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
                : { matches: ['<all_urls>'] }

            return {
                matches: config.matches,
                js: [`./js/content-${d.name}.js`],
            }
        })
}

function createManifest(resources: string[]): Manifest {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

    return {
        manifest_version: 3,
        name: pkg.longName ?? pkg.name ?? 'My Extension',
        version: pkg.version,
        description: pkg.description ?? '',
        action: {
            default_popup: './src/scripts/popup/popup.html',
        },
        options_ui: {
            page: './src/scripts/options/options.html',
            open_in_tab: true,
        },
        background: {
            service_worker: 'js/service-worker.js',
            type: 'module',
        },
        icons: {
            '16': './assets/icon-16.png',
            '48': './assets/icon-48.png',
            '128': './assets/icon-128.png',
        },
        permissions: [],
        content_scripts: discoverContentScripts(),
        web_accessible_resources: [
            {
                matches: ['https://*/*', 'http://*/*'],
                resources,
            },
        ],
        commands: {
            refresh_extension: {
                suggested_key: { default: 'Ctrl+Space' },
                description: 'Refresh Extension',
            },
        },
    }
}

export async function writeManifest(): Promise<void> {
    const dir = 'dist/js'
    const files = fs.existsSync(dir)
        ? fs
              .readdirSync(dir)
              .filter(f => f.endsWith('.js'))
              .map(f => `js/${f}`)
        : []

    const manifest = createManifest(files)
    fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2))
    console.log('manifest.json generated')
}
