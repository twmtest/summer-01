// @/app/context/context/search-provider.tsx
'use client'
import { createContext, useState } from 'react';

export const SearchContext = createContext(null);

export default function SearchProvider({ children }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [stickerImage,setStickerImage] = useState(null);
    const [loading,setLoading] = useState(false)
    return (
        <SearchContext.Provider value={{ selectedImage, setSelectedImage,stickerImage,setStickerImage,loading,setLoading }}>
            {children}
        </SearchContext.Provider>
    );
}
