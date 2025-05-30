"use client";
import React, { useState } from "react";
import { Banner } from "@/types/Partner";
import Image from "next/image";

const BannerPage = ({
    banners
}: {
    banners: Banner[]
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    // Jika tidak ada banner, tampilkan pesan "No Banner"
    if (banners.length === 0) {
        return (
            <div className="relative aspect-[1/1] lg:aspect-[3/1] flex items-center justify-center bg-gray-100 rounded-xl">
                <p className="text-gray-500 text-md">No Banner Available</p>
            </div>
        );
    }

    return (
        <div className="relative aspect-[3/1] lg:mx-4 lg:my-4  lg:rounded-xl overflow-hidden shadow-sm"> {/* Aspect ratio 3:1 dan rounded corners */}
            {banners.map((banner, index) => (
                <Image
                    key={index}
                    src={banner.imageUrl}
                    alt={`Banner ${index + 1}`}
                    className={`object-contain w-full ${index === currentIndex ? 'block' : 'hidden'}`}
                    width={1200}
                    height={1200}
                    priority={index === 0}
                />
            ))}

                <div style={{ display: banners.length > 1 ? "block" : "none" }}>
                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {banners.map((_, index) => (
                            <div
                                key={index}
                                // onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
        </div>

    );
};

export default BannerPage;