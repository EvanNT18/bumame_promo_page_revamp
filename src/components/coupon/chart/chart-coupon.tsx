"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import Link from "next/link";
import { CopyIcon } from "lucide-react";

interface CouponCardProps {
    discount: string;
    minTransaction: string;
    cardType: string;
    couponCode: string;
}

const CouponCard = ({
    discount,
    minTransaction,
    couponCode,
}: CouponCardProps) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        toast({
            title: "Kode disalin!",
            description: `Kode ${couponCode} telah disalin ke clipboard.`,
            duration: 2000,
        });

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full">
            {/* Color side dot */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-12 bg-[#204eab] rounded-r-full"></div>

            <div className="p-4 pl-6">
                {/* Bank logo */}
                <div className="flex items-center mb-2">
                    <span className="text-blue-600 font-bold mr-1">BCA</span>
                </div>

                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{discount}</h3>
                        <p className="text-xs text-gray-500 mt-1">{minTransaction}</p>
                    </div>
                </div>

                {/* Coupon code section */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="bg-blue-100 p-1 rounded mr-2">
                            <CopyIcon className="w-4 h-4 text-blue-600" />
                        </span>
                        <span className="text-sm font-medium text-gray-700">{couponCode}</span>
                    </div>

                    <Link target="_blank" href="https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+BUMAMEBNI10&type=phone_number&app_absent=0" className={`px-4 py-1.5 rounded-md ${copied
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        } transition-colors focus:outline-none`}>
                        Redeem
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CouponCard;
