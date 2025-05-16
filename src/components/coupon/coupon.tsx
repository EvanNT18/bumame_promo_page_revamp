"use client";

import React from "react";
import CouponCard from "./chart/chart-coupon";
import {Partner,Voucher} from "@/types/Partner"
const CouponPage = ({
  partner,
  vouchers,
}: {
  partner: Partner;
  vouchers: Voucher[];
}) => {

  return (
    <div className="py-8 px-4 md:px-6 bg-purple-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#204eab] mb-2">Your Exclusive Voucher Code</h2>
        <p className="text-center text-[#2d58b0] max-w-2xl mx-auto mb-8">
          Use this code when chatting with our staff to claim your discount.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((vouchers, index) => (
            <CouponCard
              key={index}
              logoUrl={partner.logoUrl}
              couponCode={vouchers.voucherCode}
              description={vouchers.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponPage;