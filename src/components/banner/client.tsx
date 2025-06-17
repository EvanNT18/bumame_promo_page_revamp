"use client";
import { useState } from "react";
import type { Banner } from "@/types/Partner";
import Image from "next/image";

const BannerPage = ({ banners }: { banners: Banner[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  // If no banners, show "No Banner" message
  if (banners.length === 0) {
    return (
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/1] flex items-center justify-center bg-gray-100 lg:mx-4 lg:my-4 lg:rounded-xl">
        <p className="text-gray-500 text-sm sm:text-base">
          No Banner Available
        </p>
      </div>
    );
  }

  return (
    <div className="relative lg:mx-4 lg:my-4 lg:rounded-xl overflow-hidden shadow-sm bg-gray-100">
      {/* Responsive aspect ratio */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[3/1]">
        {banners.map((banner, index) => (
          <Image
            key={index}
            src={banner.imageUrl || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            className={`w-full h-full object-contain sm:object-cover ${
              index === currentIndex ? "block" : "hidden"
            }`}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        ))}
      </div>

      {/* Navigation - only show if multiple banners */}
      {banners.length > 1 && (
        <>
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white w-3 sm:w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerPage;
