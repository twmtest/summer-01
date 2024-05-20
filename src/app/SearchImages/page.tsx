'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  interface Image {
    imageUrl: string;
    imageName: string;
}
    const { data: session } = useSession();
    const router = useRouter();
    const [images, setImages] = useState<Image[]>([]);
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        // 在组件挂载时读取查询参数
        const queryParams = new URLSearchParams(window.location.search);
        const keywordFromQuery = queryParams.get('keyword') || '';
        setKeyword(keywordFromQuery);
    }, [router]);

    useEffect(() => {
        const getImages = async () => {
            try {
                if (session && keyword) {
                    const res = await fetch(`/api/SearchImage?parama=${keyword}`, {
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

        if (keyword) {
            getImages();
        }
    }, [session, keyword]);

    return (
        <main className='px-4 py-6 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl'>
                <div className="flex flex-col items-center justify-start min-h-screen">
                    <div>
                        <h1 className="text-lg font-semibold leading-8 text-zinc-800">
                            Stickers
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
