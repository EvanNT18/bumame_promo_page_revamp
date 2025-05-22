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
import Image from "next/image";

export default function LandingPagePromo({ params }: { params: any }) {
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
    document.title = res.data.name;
    // const links = Array.from(document.getElementsByTagName("link"));
    // const favicon = links.find((link) => link.rel === "icon");
    // if (favicon) favicon.href = res.data.logoUrl;
    (document.querySelector("link[rel='icon']") as HTMLLinkElement).href = res.data.logoUrl;
  }

  if (!partner) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <Banner banners={partner.banners} />
        </div>
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <Subtitle subtitles={partner.subtitles} />
        </div>
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <CouponPage partner={partner} vouchers={partner.vouchers} />
        </div>
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <HowToRedeem />
        </div>
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <TermsAndConditions terms={partner.terms} />
        </div>
        <div className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <FAQ faqs={partner.faqs} />
        </div>
        <footer className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo/bumame_b.png"
                alt="Bumame Logo"
                width={40}
                height={40}
                className=""
              />
              <p className="font-semibold text-xl" style={{ fontFamily: `ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"` }}>Bumame</p>
            </div>
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Bumame. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
