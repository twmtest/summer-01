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
    <div style={style} className="p-2 flex flex-col items-center justify-center">
      <Link 
        href={`/image/${image.id}?imageName=${encodeURIComponent(image.imageName)}`} 
        className="block transform transition duration-300 hover:scale-105"
      >
        <Image
          src={image.imageUrl}
          alt={image.imageName}
          className="rounded-lg"
          width={150} // 调整图片宽度
          height={150} // 调整图片高度
          priority={true}
        />
        <p className="mt-2 text-center text-gray-800">{image.imageName}</p>
      </Link>
    </div>
  );
};

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1000);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnCount = windowWidth >= 1024 ? 4 : windowWidth >= 768 ? 2 : 2;
  const rowCount = Math.ceil(images.length / columnCount);

  return (
    <main className='px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <div className="mb-20 mt-12 text-center">
            <div className="mb-3 flex items-center justify-center">
              <Image
                src="/StickerSprout.jpg"
                width={36}
                height={38}
                className="mr-3"
                alt="StickerBaker icon"
              />
              <p className="font-bold text-3xl text-orange-500 font-brand">StickerSprout</p>
            </div>
          </div>
          <SearchProvider>
            <Search />
            <UploadImage />
          </SearchProvider>
          <div>
            <h1 className="text-lg font-semibold leading-8 text-zinc-800 text-center">
              Latest
            </h1>
          </div>
          <div className="flex justify-center w-full overflow-hidden"> {/* 添加 overflow-hidden 确保没有滚动条 */}
            <Grid
              columnCount={columnCount}
              columnWidth={windowWidth >= 1024 ? 250 : windowWidth >= 768 ? 300 : 160}
              height={window.innerHeight - 200} // 动态调整高度，使其适应视口高度，避免滚动条
              rowCount={rowCount}
              rowHeight={300}
              width={Math.min(windowWidth - 32, columnCount * (windowWidth >= 1024 ? 250 : windowWidth >= 768 ? 300 : 160))}
              itemData={{ images, columnCount }}
            >
              {Cell}
            </Grid>
          </div>
        </div>
      </div>
    </main>
  );
}
