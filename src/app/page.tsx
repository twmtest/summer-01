// @/app/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import Search from '@/app/Components/Search';
import UploadImage from "@/app/Components/Upload";
import SearchProvider from "@/app/context/search-provider";
import { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';

interface Image {
  imageUrl: string;
  imageName: string;
  id: number;
}

interface CellProps extends GridChildComponentProps {
  data: {
    images: Image[];
    columnCount: number;
  };
}

const Cell: React.FC<CellProps> = ({ columnIndex, rowIndex, style, data }) => {
  const { images, columnCount } = data;
  const image = images[rowIndex * columnCount + columnIndex];
  if (!image) return null;

  return (
    <div style={style} className="p-2">
      <Link 
        href={`/image/${image.id}?imageName=${encodeURIComponent(image.imageName)}`} 
        className="block transform transition duration-300 hover:scale-105"
      >
        <Image
          src={image.imageUrl}
          alt={image.imageName}
          className="rounded-lg"
          width={230}
          height={230}
          priority={true}
        />
        <p className="mt-2 text-center text-gray-800">{image.imageName}</p>
      </Link>
    </div>
  );
};

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
        setImages(data.images);
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

  const columnCount = 4;
  const rowCount = Math.ceil(images.length / columnCount);

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
          <SearchProvider>
            <Search />
            <UploadImage />
          </SearchProvider>
          <div>
            <h1 className="text-lg font-semibold leading-8 text-zinc-800">
              Latest
            </h1>
          </div>
          <Grid
            columnCount={columnCount}
            columnWidth={250}
            height={800}
            rowCount={rowCount}
            rowHeight={300}
            width={1000}
            itemData={{ images, columnCount }}
          >
            {Cell}
          </Grid>
        </div>
      </div>
    </main>
  );
}
