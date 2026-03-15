import '@/styles/index.css'
import { createRoot } from 'react-dom/client'

const OnInstalled = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900">
            <h1 className="text-2xl font-semibold text-neutral-50">Thanks for Installing!</h1>
        </div>
    )
}

createRoot(document.getElementById('onInstalled')!).render(<OnInstalled />)
