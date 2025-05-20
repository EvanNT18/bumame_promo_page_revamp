"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import Link from "next/link";
import { Check as CheckIcon, CopyIcon } from "lucide-react";

const CouponCard = ({
    title,
    partnerName,
    description,
    logoUrl,
    couponCode,
}: {
    title: string;
    partnerName: string;
    description: string;
    logoUrl: string;
    couponCode: string;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full">
            {/* Color side dot */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-[#204eab] rounded-r-full"></div>

            <div className="px-6 py-4">
                <div className="flex items-center gap-4 mb-2"
                >
                    <img src={logoUrl} alt="Bank logo" className="w-8 h-8" />
                    <h3 className="font-bold text-lg">
                        {partnerName}
                    </h3>
                </div>
                <div className="flex items-start justify-between">
                      <h3 className="font-bold text-lg text-gray-800">
                            {title}
                          </h3>
                </div>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                    </div>
                </div>

                {/* Coupon code section */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="bg-blue-100 p-1 rounded mr-2 transition-colors hover:bg-blue-200 cursor-pointer" onClick={handleCopy}>
                            {/* <CopyIcon className="w-4 h-4 text-blue-600" /> */}
                            {copied ? (
                                <CheckIcon className="w-4 h-4 text-blue-600" />
                            ) : (
                                <CopyIcon className="w-4 h-4 text-green-600" />
                            )}
                        </span>
                        <span className="text-sm font-medium text-gray-700">{couponCode}</span>
                    </div>

                    <Link target="_blank" href={`https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+${encodeURIComponent(couponCode)}`} className={`px-4 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors focus:outline-none`}>
                        Redeem
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;
