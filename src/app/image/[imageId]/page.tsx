'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ImageData {
  id: number;
  imageUrl: string;
  imageName: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const { imageId } = useParams();
  const imageName = searchParams.get('imageName');
  const [image, setImage] = useState<ImageData | null>(null);
  const [similarImages, setSimilarImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (imageId) {
      fetchImage(imageId as string)
        .then(data => setImage(data))
        .catch(error => console.error('Error fetching image:', error));
    }

    if (imageName) {
      fetchSimilarImages(imageName, imageId as string)
        .then(data => setSimilarImages(data))
        .catch(error => console.error('Error fetching similar images:', error));
    }
  }, [imageId, imageName]);

  const fetchImage = async (imageId: string) => {
    const response = await fetch(`/api/SelectImage?imageId=${imageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!data.images || data.images.length === 0) {
      throw new Error('Image not found');
    }

    return data.images[0];
  };

  const fetchSimilarImages = async (imageName: string, imageId: string) => {
    const response = await fetch(`/api/FindImages?imageName=${encodeURIComponent(imageName)}&imageId=${imageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data.images;
  };

  const handleDownload = async () => {
    try {
      if (!image) return;

      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'image/png' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${image.imageName}.png`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  if (!imageId) {
    return <div>Loading...</div>;
  }

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex min-h-screen">
          <div className="w-2/3 p-4">
            <h1 className="text-lg font-semibold leading-8 text-zinc-800 mb-4">
              {image ? image.imageName : 'Loading...'}
            </h1>
            {image && (
              <div className="text-center">
                <Image
                  src={image.imageUrl}
                  alt={image.imageName}
                  width={500}
                  height={500}
                  className="rounded-lg"
                  priority
                />
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-80"
                  onClick={handleDownload}
                >
                  Download
                </button>
              </div>
            )}
          </div>
          <div className="w-1/3 p-4">
            <h2 className="text-lg font-semibold leading-8 text-zinc-800 mb-4">
              Similar Images
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {similarImages.map((img) => (
                <div key={img.imageUrl} className="text-center">
                  <Link href={`/image/${img.id}?imageName=${encodeURIComponent(img.imageName)}`}>
                    <Image
                      src={img.imageUrl}
                      alt={img.imageName}
                      width={200}
                      height={200}
                      className="rounded-lg cursor-pointer"
                    />
                  </Link>
                  <p className="text-gray-800">{img.imageName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
