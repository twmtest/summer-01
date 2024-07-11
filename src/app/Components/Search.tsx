'use client'
import { useState, useContext } from 'react';
import Image from "next/image";
import axios from 'axios';
import { SearchContext } from '../context/search-provider';
import { useSession } from 'next-auth/react';
import Router from "next/router";

const Search = () => {
    const { data: session, status } = useSession();
    const [inputValue, setInputValue] = useState('');
    const { selectedImage, setSelectedImage, stickerImage, setStickerImage, loading, setLoading } = useContext(SearchContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session) {
            await MakeSticker();
        } else {
            Router.push({ pathname: '/Login', query: {} });
        }
    };

    const MakeSticker = async () => {
        try {
            const prompt = inputValue;
            const image = selectedImage;
            if (!image) {
                console.error('No image selected');
                return;
            }
            setLoading(true);
            setInputValue('');
            setSelectedImage("");

            const makestickerresponse = await axios.post('https://ai-sticker-sprout-node.vercel.app/api/makesticker', { image, prompt }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Sticker created successfully:', makestickerresponse.data[0]);
            setStickerImage(makestickerresponse.data[0]);
            await uploadImage(makestickerresponse.data[0]);
        } catch (error) {
            console.error('Error creating sticker:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (image: string) => {
        if (image) {
            try {
                const prompt = inputValue;
                const response1 = await axios.post('https://ai-sticker-sprout-node.vercel.app/api/uploadImage', { image, prompt }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Image uploaded successfully:', response1.data.result);
                const { uploaded, variants, meta } = response1.data.result;

                if (session?.user && session.user?.sub && response1.data.result) {
                    const userId = session.user.sub;

                    const res = await fetch(`/api/UploadImage`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                            filename: meta.filename,
                            uploaded,
                            variants
                        }),
                    });

                    console.log('Image data inserted successfully:', res);
                } else {
                    console.error('User not authenticated');
                }
            } catch (error: any) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.error('No image selected');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full sm:w-1/2 mt-4">
            <div className="flex items-center justify-center w-full sm:ml-12">
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
                <button
                    type="submit"
                    className={`inline-flex items-center justify-center ml-2 border rounded-lg bg-white group hover:bg-orange-50 text-zinc-900 hover:text-orange-700 px-4 py-2.5 font-bold ${!session && 'cursor-not-allowed opacity-50'}`} // 添加条件样式
                    disabled={!session} // 禁用按钮
                >
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
