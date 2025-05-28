"use client";

import Banner from "@/components/banner/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import Subtitle from "@/components/subtitle/client";
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

        {/* Banners */}
        <div className="mx-auto lg:pb-16">
          <Banner banners={partner.banners} />
        </div>
        {/* EOL Banners */}

        {/* Subtitles */}
        <div className="container mx-auto lg:pb-16">
          <Subtitle subtitles={partner.subtitles} />
        </div>
        {/* EOL Subtitles */}

        {/* Voucher Code */}
        <div className="container mx-auto pb-16 sm:px-2 lg:px-4">
          <CouponPage partner={partner} vouchers={partner.vouchers} />
        </div>
        {/* EOL Voucher Code */}

        {/* How to Redeem */}
        <div className="container mx-auto max-w-2xl pb-16">
          <HowToRedeem />
        </div>
        {/* EOL How to Redeem */}

        {/* Terms and Conditions */}
        <div className="container mx-auto max-w-2xl pb-16">
          <TermsAndConditions terms={partner.terms} />
        </div>
        {/* EOL Terms and Conditions */}

        {/* FAQ */}
        <div className="container mx-auto max-w-2xl pb-16">
          <FAQ faqs={partner.faqs} />
        </div>
        {/* EOL FAQ */}

        <footer className="bg-gray-100 w-full">
          <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo/bumame_b.png"
                  alt="Bumame Logo"
                  width={40}
                  height={40}
                  className=""
                />
                <p className="font-semibold text-xl" style={{ fontFamily: `ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"` }}>
                  Bumame
                </p>
              </div>

              <div className="">
                <p className="text-center text-gray-500 text-sm order-first md:order-none">
                  © {new Date().getFullYear()} Bumame. All rights reserved.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
