
import React from "react";
import CouponCard from "./chart/chart-coupon";

const CouponPage = () => {
  const coupons = [
    {
      discount: "Diskon Rp750rb",
      minTransaction: "Min. transaksi Rp12,5jt dengan semua Kartu Kredit BCA berlogo Visa, Mastercard, JCB",
      cardType: "BCA",
      couponCode: "EPICCC3BCA",
      isOutOfStock: true,
    },
    {
      discount: "Diskon Rp275rb",
      minTransaction: "Min. transaksi Rp5jt dengan semua Kartu Kredit BCA berlogo Visa, Mastercard, JCB",
      cardType: "BCA",
      couponCode: "EPICCC2BCA",
      isOutOfStock: true,
    },
    {
      discount: "Diskon Rp150rb",
      minTransaction: "Min. transaksi Rp2jt dengan semua Kartu Kredit BCA berlogo Visa, Mastercard, JCB",
      cardType: "BCA",
      couponCode: "EPICCC1BCA",
    },
    {
      discount: "Hemat 10%",
      minTransaction: "Min. transaksi Rp500rb dengan Kartu Debit/Kredit",
      cardType: "Any",
      couponCode: "PROMOHARI10",
    },
  ];

  return (
    <div className="py-8 px-4 md:px-6 bg-purple-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#204eab] mb-2">Your Exclusive Voucher Code</h2>
        <p className="text-center text-[#2d58b0] max-w-2xl mx-auto mb-8">
          Use this code when chatting with our staff to claim your discount.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <CouponCard
              key={index}
              discount={coupon.discount}
              minTransaction={coupon.minTransaction}
              cardType={coupon.cardType}
              couponCode={coupon.couponCode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponPage;