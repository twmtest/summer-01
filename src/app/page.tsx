// @/app/page.tsx
'use client'
import Image from "next/image";
import Search from '@/app/Components/Search'
import UploadImage from "./Components/Upload";
import SearchProvider from "@/app/context/search-provider"
import { useState, useEffect } from 'react';
interface Image {
  imageUrl: string;
  imageName: string;
}
export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await fetch('/api/UploadImage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setImages(data.images); // Assuming the response contains an 'images' array
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    getImages();
    const interval = setInterval(() => {
      getImages();
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
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
    <div>
    <h1 className="text-lg font-semibold leading-8 text-zinc-800">
      Latest
    </h1>
    
  </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 mb-24 mt-6 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image.imageUrl}
                  alt={image.imageName}
                  className="rounded-lg"
                  width={230}
                  height={230}    
                  priority={true}
                />
                <p className="mt-2 text-center text-gray-800">{image.imageName}</p>
              </div>
      ))}
    </div>

    </div>
      </div>
      
    </main>
    
  );
}
