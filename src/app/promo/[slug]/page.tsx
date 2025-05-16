"use client";

import Banner from "@/components/banner/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import Subtitle from "@/components/subtitle/client";
import VoucherCode from "@/components/voucher/client";
import HowToRedeem from "@/components/how-to-reedem/client";
import CouponPage from "@/components/coupon/coupon";

import { useState, useEffect } from "react";
import { Partner } from "@/types/Partner";
import api from "@/lib/api";

export default function LandingPagePromo({ params } : { params: any }) {
  const { slug } = params;
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartner();
  }, []);

  async function fetchPartner() {
    const res = await api({
      url: `/partners/by_slug/${slug}`,
    });

    setPartner(res.data);
  }

  if (!partner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4">
      </div>
      <Banner banners={partner.banners} />
      <Subtitle subtitles={partner.subtitles} />
      <CouponPage partner={partner} vouchers={partner.vouchers} />
      <HowToRedeem />
      <TermsAndConditions terms={partner.terms} />
      <FAQ faqs={partner.faqs} />
    </div>
  );
}
