// @/app/page.tsx
import Image from "next/image";
import Search from '@/app/Components/Search'
import UploadImage from "./Components/Upload";
import SearchProvider from "@/app/context/search-provider"

export default function Home() {
  
  
  return (
    <main className='px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="mb-20 mt-12 text-center">
        <div className="mb-3 flex items-center">
          <Image
            src="/favicon.ico"
            width={36}
            height={36}
            className="h-9 w-9"
            alt="StickerBaker icon"
          />
          <p className="font-bold text-3xl text-orange-500 font-brand">StickerBaker</p>
        </div>
      </div>
    <SearchProvider >
      <Search />
      <UploadImage />
    </SearchProvider>
    
    </div>
      </div>
      
    </main>
    
  );
}
