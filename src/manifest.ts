import fs from 'fs-extra'
import path from 'path'

interface Manifest {
    manifest_version: number
    name: string
    version: string
    description: string
    action: {
        default_popup: string
    }
    options_ui: {
        page: string
        open_in_tab: boolean
    }
    background: {
        service_worker: string
        type: string
    }
    icons: {
        [key: number]: string
    }
    permissions: string[]
    content_scripts: Array<{
        matches: string[]
        js: string[]
    }>
    web_accessible_resources?: Array<{
        matches: string[]
        resources: string[]
    }>
    commands?: {
        [key: string]: {
            suggested_key: {
                default: string
                mac?: string
                windows?: string
                chromeos?: string
                linux?: string
            }
            description: string
        }
    }
}

const createBaseManifest = async (): Promise<Manifest> => {
    try {
        const pkg = await fs.readJSON('package.json')

        return {
            manifest_version: 3,
            name: pkg.longName ?? pkg.name ?? 'GIVE ME A NAME',
            version: pkg.version,
            description: pkg.description ?? 'GIVE ME A DESCRIPTION',
            action: {
                default_popup: './src/scripts/popup/popup.html'
            },
            options_ui: {
                page: './src/scripts/options/options.html',
                open_in_tab: true
            },
            background: {
                service_worker: 'js/service-worker.js',
                type: 'module'
            },
            icons: {
                16: './assets/icon-16.png',
                48: './assets/icon-48.png',
                128: './assets/icon-128.png'
            },
            permissions: [],
            content_scripts: [
                {
                    matches: ['<all_urls>'],
                    js: ['./js/content.js']
                }
            ],
            commands: {
                refresh_extension: {
                    suggested_key: {
                        default: 'Ctrl+Space'
                    },
                    description: 'Refresh Extension' // https://developer.chrome.com/docs/extensions/reference/commands/
                }
            }
        }
    } catch (error) {
        console.error('Error reading package.json:', error)
        throw error
    }
}

const getManifest = async (resources: string[]): Promise<Manifest> => {
    try {
        const baseManifest = await createBaseManifest()
        return {
            ...baseManifest,
            web_accessible_resources: [
                {
                    matches: ['https://*/*', 'http://*/*'],
                    resources
                }
            ]
        }
    } catch (error) {
        console.error('Error creating manifest:', error)
        throw error
    }
}

const readJsFiles = async (dir: string): Promise<string[]> => {
    try {
        const files = await fs.readdir(dir)
        return files
            .filter((file: string) => path.extname(file) === '.js')
            .map((file: string) => path.join(dir, file))
    } catch (error) {
        console.error(`Error reading JS files from ${dir}:`, error)
        throw error
    }
}

export const writeManifest = async (): Promise<void> => {
    try {
        const dir = 'dist/js'
        const files = await readJsFiles(dir)

        const manifest = await getManifest(files)

        fs.writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2))
    } catch (error) {
        console.error('Issue writing manifest.json:', error)
    }
}
