import React from 'react'
const App = () => {
    return (
        <div className="absolute top-0 right-0 p-4">
            <div className="inline-flex items-center justify-center h-16 rounded-full">
                <div className="inline-flex items-center justify-end p-2 rounded-full bg-gradient-to-r from-fuchsia-700 to-blue-400">
                    <div className="inline-flex flex-col self-stretch justify-center gap-2 px-4">
                        <div className="text-xs font-medium leading-tight tracking-wider uppercase text-neutral-900">
                            GIMME IS IN BETA
                        </div>
                        <div className="text-xs font-normal leading-tight tracking-wider text-white uppercase">
                            Gimme is a quick and simple way to monetize your community in a natural,
                            cooperative way. Come give us a try!
                        </div>
                    </div>
                    <div className="self-stretch px-8 pt-3.5 pb-4 bg-white rounded-full justify-start items-start inline-flex">
                        <div className="text-base font-bold text-center text-black">
                            Sign up free
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
