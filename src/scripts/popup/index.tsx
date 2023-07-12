import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import Popup from './Popup'
import React from 'react'

const container = document.getElementById('popup-root')
const root = createRoot(container!)

root.render(<Popup />)
