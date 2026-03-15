import { useEffect, useState } from 'react'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(true)
        chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
            console.log('Content script received message:', request)
        })
    }, [])

    if (!isOpen) return null

    return (
        <div className="fixed bottom-0 right-0 p-4">
            <div className="inline-flex items-center justify-center h-16 rounded-full">
                <div className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                    <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                        <div className="font-normal leading-tight tracking-wider text-white text-base">
                            Content script overlay — React 19 + Tailwind v4
                        </div>
                    </div>
                    <button
                        className="inline-flex items-start self-stretch justify-start p-4 px-8 duration-200 bg-white rounded-full cursor-pointer hover:bg-gotham-black-50 text-base font-bold text-center text-black"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
