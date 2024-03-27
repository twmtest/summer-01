'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
export default function TopBar() {
    const router = useRouter()

    const handleOvenClick = () => {
        router.push('/MyPictures');
    };
    const handleSearchClick = () => {
        router.push('/SearchPictures');
    };

    return(
        <div className="px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between border-b border-zinc-100 py-3">
                <div className="flex items-center gap-4">
                    <Image
                        src="/favicon.ico"
                        width={36}
                        height={36}
                        className="h-9 w-9"
                        alt="this is icon"
                    />
                    <span className="hidden md:inline-flex font-brand text-orange-500 "> StickerBaker</span>
                    <a href="https://github.com/cbh123/stickerbaker" className="font-brand hidden md:inline-flex">Open Source AI Sticker Maker</a>
                </div>
                <div className="font-brand flex items-center gap-4">
                    <button onClick={handleOvenClick} className="phx-submit-loading:opacity-75 rounded-lg bg-white hover:bg-gray-50 py-2 px-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 active:text-gray-800 ">Oven</button>
                    <button onClick={handleSearchClick} className="phx-submit-loading:opacity-75 rounded-lg bg-white hover:bg-gray-50 py-2 px-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 active:text-gray-800 ">Search</button>
                </div>
            </div>
        </div>
    );
}
