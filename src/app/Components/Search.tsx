'use client'
import { useState, useContext } from 'react';
import Image from "next/image";
import axios from 'axios';
import { SearchContext } from '../context/search-provider';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const { selectedImage, setSelectedImage,stickerImage,setStickerImage,loading,setLoading  } = useContext(SearchContext);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 处理提交逻辑
        MakeSticker();
    };

    const uploadImage = async (image) => {
        if (image) {
            try {
                
                const response = await axios.post('http://localhost:5000/uploadImage', { image });
                console.log('Image uploaded successfully:', response.data.result);
               
            } catch (error) {
                console.error('Error uploading image:', error.response.data);
            }
        } else {
            console.error('No image selected');
        }
    };

    const MakeSticker = async () => {
        try {
            
            
            const prompt = inputValue;
            const image = selectedImage;
            // 检查是否选择了图片
            if (!selectedImage) {
                console.error('No image selected');
                return;
            }
            setLoading(true);
            setInputValue('');
            setSelectedImage(null);
            
            const makestickerresponse = await axios.post('http://localhost:5000/makesticker', { image, prompt });

           
            console.log('Sticker created successfully:', makestickerresponse.data[0]);
            setStickerImage(makestickerresponse.data[0])
            uploadImage(makestickerresponse.data[0]);

        } catch (error) {
            console.error('Error creating sticker:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2   mt-4">
            <div className="flex items-center justify-center w-full ml-12">
                <div className="relative w-full">
                    <input
                        type="text"
                        name="prompt"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="mt-2 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
                        required
                        placeholder="What is your sticker?"
                    />
                </div>
                <button type="submit" className="inline-flex items-center justify-center ml-2 border rounded-lg bg-white group hover:bg-orange-50 text-zinc-900 hover:text-orange-700 px-4 py-2.5 font-bold self-end">
                    <Image
                        src="/favicon.ico"
                        width={27}
                        height={27}
                        alt="Bake icon"
                    />
                    <span>
                        Bake
                    </span>
                </button>
            </div>
        </form>
    );
};

export default Search;