"use client";

import React, { useState, useEffect } from "react";
import CouponCard from "./chart/chart-coupon";
import { Partner, Voucher } from "@/types/Partner";
import logoColorExtractor from "@/lib/colorExtractor";

const CouponPage = ({
  partner,
  vouchers,
}: {
  partner: Partner;
  vouchers: Voucher[];
}) => {
  const [logoColor, setLogoColor] = useState("#204eab"); // Default blue color
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const extractColor = async () => {
      try {
        const color = await logoColorExtractor(partner.logoUrl);
        setLogoColor(color);
      } catch (error) {
        console.error("Error extracting color:", error);
        // Fallback to default color
        setLogoColor("#204eab");
      } finally {
        setIsLoading(false);
      }
    };

    extractColor();
  }, [partner.logoUrl]);

  if (isLoading) {
    return (
      <div className="py-8 px-4 md:px-6 rounded-xl bg-gray-100 animate-pulse">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Function to calculate a lighter version of the color for the background
  const lightenColor = (color: string, percent: number) => {
    // Simple lightening function - consider using a library for more accurate results
    return `${color}${Math.floor(percent * 255)
      .toString(16)
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="py-8 px-4 md:px-6 rounded-xl"
      style={{
        backgroundColor: lightenColor(logoColor, 0.1), // 10% opacity of the logo color
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-2xl font-bold text-center mb-2"
          style={{ color: logoColor }}
        >
          Your Exclusive Voucher Code
        </h2>
        <p
          className="text-center max-w-2xl mx-auto mb-8"
          style={{ color: logoColor }}
        >
          Use this code when chatting with our staff to claim your discount.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((voucher, index) => (
            <CouponCard
              key={index}
              title={voucher.title}
              logoUrl={partner.logoUrl}
              couponCode={voucher.voucherCode}
              description={voucher.description}
              slug={voucher.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
