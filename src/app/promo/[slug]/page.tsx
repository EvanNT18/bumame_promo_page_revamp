// src/app/promo/[slug]/page.tsx
import { notFound } from "next/navigation";
import Banner from "@/components/banner/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import Subtitle from "@/components/subtitle/client";
import HowToRedeem from "@/components/how-to-reedem/client";
import CouponPage from "@/components/coupon/coupon";
import api from "@/lib/api";
import Image from "next/image";

export default async function LandingPagePromo({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await api({
      url: `/partners/by_slug/${params.slug}`,
    });

    const partner = res.data;

    if (!partner) {
      return notFound();
    }

    return (
      <div className="min-h-screen bg-white text-gray-800">
        {/* Banner */}
        <section className="relative overflow-hidden">
          <Banner banners={partner.banners} />
        </section>

        {/* Subtitle */}
        <section className="py-0 bg-gray-50">
          <div className="container mx-auto px-4">
            <Subtitle subtitles={partner.subtitles} />
          </div>
        </section>

        {/* Vouchers */}
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
  } catch (err) {
    console.error("Failed to load partner:", err);
    return notFound();
  }
}
