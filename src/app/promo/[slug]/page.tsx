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

export default function LandingPagePromo({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    fetchPartner();
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  async function fetchPartner() {
    try {
      const res = await api({
        url: `/partners/by_slug/${slug}`,
      });

      setPartner(res.data);
      document.title = res.data.name;

      const favicon = document.querySelector(
        "link[rel='icon']"
      ) as HTMLLinkElement;
      if (favicon) favicon.href = res.data.logoUrl;
    } catch (err) {
      console.error("Failed to load partner:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !partner) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <Banner banners={partner.banners} />
      </section>

      {/* Subtitles */}
      <section className="py-0 bg-gray-50">
        <div className="container mx-auto px-4">
          <Subtitle subtitles={partner.subtitles} />
        </div>
      </section>

      {/* Voucher Cards */}
      <section id="vouchers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <CouponPage partner={partner} vouchers={partner.vouchers} />
        </div>
      </section>

      {/* How to Redeem */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 mb-20 max-w-3xl">
          <HowToRedeem />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-7 max-w-3xl">
          <FAQ faqs={partner.faqs || []} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo/bumame_b.png"
                alt="Bumame Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-bold">Bumame</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>
                © {new Date().getFullYear()} Bumame. All rights reserved.
              </span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
