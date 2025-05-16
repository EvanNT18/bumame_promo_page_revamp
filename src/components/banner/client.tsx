"use client";
import Image from "next/image";
import React from "react";

const Banner = () => {
    const bannerImage = "/banner/bni.png";

    return (
        <div className="relative bg-gray-800 w-full overflow-hidden">
            <Image
                src={bannerImage}
                alt="Banner"
                className="object-cover w-full h-full"
                width={1000}
                height={1000}
            />
        </div>
    );
};

export default Banner;
