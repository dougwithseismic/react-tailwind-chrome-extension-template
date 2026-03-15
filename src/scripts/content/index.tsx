import { createRoot } from 'react-dom/client'
import styles from '@/styles/index.css?inline'
import App from './App'

const isProduction = process.env.NODE_ENV === 'production'
const ROOT_ID = 'chrome-ext-root'

function injectReact(rootId: string) {
    const container = document.createElement('div')
    container.id = rootId
    container.style.position = 'inherit'
    container.style.zIndex = '2147483666'
    document.body.appendChild(container)

    const target = isProduction
        ? container.attachShadow({ mode: 'open' })
        : container

    const root = createRoot(target)
    root.render(
        <>
            {isProduction && <style>{styles}</style>}
            <App />
        </>
    )
}

injectReact(ROOT_ID)
