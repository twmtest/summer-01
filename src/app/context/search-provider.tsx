// @/app/context/context/search-provider.tsx
'use client'
import { ReactNode, createContext, useState } from 'react';



export const SearchContext = createContext({
    selectedImage: "",
    setSelectedImage: (image: string) => {},
    stickerImage: "",
    setStickerImage: (image: string) => {},
    loading: false,
    setLoading: (loading:boolean) => {}
});

export default function SearchProvider({ children }: { children: ReactNode }) {
    const [selectedImage, setSelectedImage] = useState("");
    const [stickerImage,setStickerImage] = useState("");
    const [loading,setLoading] = useState(false)
    return (
        <SearchContext.Provider value={{ selectedImage, setSelectedImage,stickerImage,setStickerImage,loading,setLoading }}>
            {children}
        </SearchContext.Provider>
    );
}
