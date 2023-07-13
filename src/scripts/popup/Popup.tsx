import React from 'react'

const Popup = () => {
    return (
        <div className="inline-flex flex-col justify-between p-8 border shadow w-96 h-44 bg-neutral-900 rounded-xl border-zinc-800">
            <div className="inline-flex items-start justify-center gap-4">
                <div className="inline-flex flex-col items-start justify-start gap-1">
                    <div className="text-base font-semibold leading-none text-neutral-50">
                        beautiful-web-extensions
                    </div>
                    <div className="pr-2.5 justify-start items-start inline-flex">
                        <div className="text-sm font-normal leading-tight text-zinc-400">
                            Beautifully designed web extensions built with Radix UI and Tailwind
                            CSS.
                        </div>
                    </div>
                </div>
                <div className="justify-center px-8 rounded-md min-w-fit bg-zinc-800">
                    <div className="inline-flex items-center self-stretch justify-start px-2 py-2 rounded-md shadow bg-zinc-800">
                        <div className="flex items-center justify-center text-sm font-medium leading-tight text-center text-neutral-50">
                            Star
                        </div>
                    </div>
                </div>
            </div>
            <div className="inline-flex items-start justify-start gap-4">
                <div className="text-sm font-normal leading-tight text-zinc-400">TypeScript</div>
                <div className="flex items-center justify-start gap-1">
                    <div className="text-sm font-normal leading-tight text-zinc-400">20k</div>
                </div>
                <div className="text-sm font-normal leading-tight text-zinc-400">
                    Updated April 2023
                </div>
            </div>
        </div>
    )
}

export default Popup
