import React from 'react'
import ReactDOM from 'react-dom'
import '@/styles/index.css'
import { createRoot } from 'react-dom/client'

const Options = () => {
    return (
        <div>
            <h1>Options</h1>
        </div>
    )
}
const container = document.getElementById('options-root')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
)
