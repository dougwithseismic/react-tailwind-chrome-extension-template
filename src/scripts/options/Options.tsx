const Options = () => {
    return (
        <div className="flex flex-col gap-2">
            <input
                className="inline-flex items-center justify-between h-24 py-2 pl-8 border rounded-md w-96 pr-14 border-zinc-900 bg-gotham-black-800 placeholder-shown:border-gotham-black-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="First Name"
            />
            <input
                className="inline-flex items-center justify-between h-24 py-2 pl-8 border rounded-md w-96 pr-14 border-zinc-900 bg-gotham-black-800 placeholder-shown:border-gotham-black-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Last Name"
            />
            <input
                className="inline-flex items-center justify-between h-24 py-2 pl-8 border rounded-md w-96 pr-14 border-zinc-900 bg-gotham-black-800 placeholder-shown:border-gotham-black-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="you@example.com"
            />
        </div>
    )
}

export default Options
