"use client";
import Image from "next/image";
import React, { useState } from "react";

const Banner = () => {
    const bannerImages = [
        "/banner/bni.png",
        "/banner/another-image.png",
        "/banner/yet-another-image.png"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden shadow-xl">
            <div className="relative aspect-video"> {/* Fixed aspect ratio (16:9) */}
                <Image
                    src={bannerImages[currentIndex]}
                    alt={`Banner ${currentIndex + 1}`}
                    className="object-cover w-full h-full"
                    width={1200}
                    height={675}
                    priority
                />

                {/* Navigation buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicator dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;