import React, { useEffect, useState } from 'react'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        console.log('Gimme: App.tsx')
        setIsOpen(true)
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('Gimme: Message Received', request, sender, sendResponse)
        })
    }, [])

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-0 right-0 p-4">
                    <div className="inline-flex items-center justify-center h-16 rounded-full">
                        <div className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                            <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                                <div className="font-normal leading-tight tracking-wider text-white text-normal">
                                    Hey, this is an overlay from the Content script, built with
                                    React and Tailwind. Happy Building!
                                </div>
                            </div>
                            <div className="inline-flex items-start self-stretch justify-start p-4 px-8 duration-200 bg-white rounded-full cursor-pointer hover:bg-gothamBlack-50">
                                <div
                                    className="text-base font-bold text-center text-black"
                                    onClick={toggleIsOpen}
                                >
                                    Close
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default App
