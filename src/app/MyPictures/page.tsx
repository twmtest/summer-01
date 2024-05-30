'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { data: session, status } = useSession();

  interface Image {
    id: number;
    imageUrl: string;
    imageName: string;
  }

  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        if (session) {
          const res = await fetch(`/api/UserImage?userId=${session.user.sub}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await res.json();
          setImages(data.images);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    getImages();
    const interval = setInterval(() => {
      getImages();
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [session]);

  return (
    <main className='px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <div className="flex flex-col items-center justify-start min-h-screen">
          <div>
            <h1 className="text-lg font-semibold leading-8 text-zinc-800">
              My Stickers
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 mb-24 mt-6 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {images.map((image, index) => (
              <Link key={index} href={`/image/${image.id}?imageName=${encodeURIComponent(image.imageName)}`} passHref>
                <div className="relative group">
                  <Image
                    src={image.imageUrl}
                    alt={image.imageName}
                    className="rounded-lg transform transition duration-300 group-hover:scale-105 cursor-pointer"
                    width={230}
                    height={230}
                    priority={true}
                  />
                  <p className="mt-2 text-center text-gray-800">{image.imageName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
