export default function Page() {
    return (
        <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mt-6">
                        <h5 className="text-6xl font-bold font-brand">
                            <span className="text-blue-500">S</span>
                            <span className="text-red-500">t</span>
                            <span className="text-yellow-500">i</span><span className="text-blue-500">c</span>
                            <span className="text-green-500">k</span>
                            <span className="text-red-500">e</span>
                            <span className="text-yellow-500">r</span>
                            <span className="text-blue-500">S</span>
                            <span className="text-green-500">e</span>
                            <span className="text-red-500">a</span>
                            <span className="text-yellow-400">r</span>
                            <span className="text-blue-500">c</span>
                            <span className="text-green-500">h</span>
                        </h5>
                       
                    </div>
                    <form action="submit" className="mt-4">
                        <div className="relative mt-1 flex items-center">
                            <div className="w-full">
                                <label className="block text-sm font-semibold leading-6 text-zinc-800"></label>
                                <input type="text" placeholder="Search for stickers" className="mt-2 block w-full rounded-lg border border-zinc-500 py-2.5 sm:py-3 px-3 text-zinc-900 focus:outline-none focus:ring-4 focus:ring-orange-500 sm:leading-6 focus:border-orange-500 focus:ring-orange-500/5 block w-full rounded-md pr-12 shadow-sm focus:border-orange-500 sm:text-sm" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
