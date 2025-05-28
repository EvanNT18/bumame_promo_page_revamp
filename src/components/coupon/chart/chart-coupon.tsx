"use client";
import { useState, useEffect } from "react";
import { Check as CheckIcon, CopyIcon } from "lucide-react";
import logoColorExtractor from "@/lib/colorExtractor";
import Link from "next/link";

const CouponCard = ({
    title,
    description,
    logoUrl,
    couponCode,
}: {
    title: string;
    description: string;
    logoUrl: string;
    couponCode: string;
}) => {
    const [copied, setCopied] = useState(false);
    const [logoColor, setLogoColor] = useState("#3b82f6");

    useEffect(() => {
        const extractColor = async () => {
            try {
                const color = await logoColorExtractor(logoUrl);
                setLogoColor(color);
            } catch {
                setLogoColor("#3b82f6");
            }
        };
        extractColor();
    }, [logoUrl]);

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div
            className="relative w-full h-52 mx-auto rounded-xl overflow-hidden"
            style={{
                backgroundImage: "url('/cupon/cupon.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Centered content container */}
            <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-4">
                {/* Flex layout container */}
                <div className="flex flex-col w-full h-full max-w-[75%] max-h-[70%] bg-opacity-90 rounded-lg overflow-hidden">
                    {/* Top section - title and logo */}
                    <div className="flex justify-between items-center">
                        <div className="flex-1 pr-2">
                            <h3
                                className="font-medium lg:font-bold items-center text-sm line-clamp-2"
                                style={{ color: logoColor }}
                                title={title}
                            >
                                {title}
                            </h3>
                        </div>
                        <div className="flex-shrink-0">
                            <img
                                src={logoUrl}
                                alt="Logo"
                                className="max-h-12 max-w-[80px] object-contain"
                            />
                        </div>
                    </div>

                    {/* Middle section - description */}
                    <div className="flex-1">
                        <p title={description} className="text-xs sm:max-w-[180px] text-gray-600 line-clamp-2">
                            {description}
                        </p>
                    </div>

                    {/* Bottom section - coupon code and redeem button */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={handleCopy}
                                className="p-1.5 rounded-md mr-2 transition-colors hover:bg-opacity-30"
                                style={{
                                    backgroundColor: `${logoColor}20`,
                                    color: logoColor
                                }}
                            >
                                {copied ? (
                                    <CheckIcon className="w-3.5 h-3.5" />
                                ) : (
                                    <CopyIcon className="w-3.5 h-3.5" />
                                )}
                            </button>
                            <span
                                title={couponCode} 
                                className="text-sm font-medium text-gray-700"
                            >
                                {couponCode.length > 8 ? `${couponCode.slice(0, 6)}...` : couponCode}
                            </span>
                        </div>
                        <Link
                            target="_blank"
                            href={`https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+${encodeURIComponent(couponCode)}`}
                            className="px-3 py-1.5 rounded-sm text-sm"
                            style={{
                                backgroundColor: `${logoColor}20`,
                                color: logoColor
                            }}
                        >
                            Redeem
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;