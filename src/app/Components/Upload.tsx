// @/app/Components/Upload.tsx
'use client'
import { useContext } from 'react';
import Image from "next/image";
import axios from 'axios';
import { SearchContext } from '@/app/context/search-provider';
import Spinner from './Spinner';

const UploadImage = () => {
    const { selectedImage, setSelectedImage, stickerImage, setStickerImage, loading, setLoading } = useContext(SearchContext);
    
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStickerImage("");
        setLoading(false);
        const file = e.target.files?.[0]; // 使用可选链操作符 ?. 来安全地访问属性
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataURL = reader.result as string;
                setSelectedImage(dataURL); // 将 Data URL 设置为状态
                e.target.value = "";
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-64 w-2/5 mt-10">
            {!selectedImage ? (
                <>
                    <label
                        htmlFor="fileInput"
                        className="border-2 border-orange-300 h-40 w-full border-dashed rounded-lg flex py-4 flex-col justify-center items-center text-center cursor-pointer"
                    >
                        <span className="text-lg font-semibold">
                            Drag & Drop or Click to Upload
                        </span>
                    </label>
                </>
            ) : (
                
                    <Image
                        className="w-24 h-auto"
                        src={selectedImage}
                        alt="Uploaded"
                        width={230}
                        height={230}
                      />  
                
            )}
            {loading && !stickerImage && <Spinner />}
            {stickerImage && (
                <Image
                    src={stickerImage} 
                    width={230}
                    height={230}
                    alt="Sticker"
                />
            )}
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
            />
        </div>
    );
};

export default UploadImage;
