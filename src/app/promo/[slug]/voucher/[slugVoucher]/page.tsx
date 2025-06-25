"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Eye } from "lucide-react";
import Banner from "@/components/banner/client";
import VoucherCard from "@/components/couponPage/coupon";
import HowToRedeem from "@/components/how-to-reedem/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import api from "@/lib/api";
import type { Partner, Voucher } from "@/types/Partner";

export default function PromoLandingPage({
  params,
}: {
  params: { slug: string; slugVoucher: string };
}) {
  const { slug, slugVoucher } = params;
  const searchParams = useSearchParams();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isPreviewMode = slugVoucher === "preview";
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (isPreviewMode) {
          if (!sessionId) {
            throw new Error("Session ID is required for preview mode");
          }

          const previewResponse = await api({
            url: `/vouchers/preview/${sessionId}`,
            method: "GET",
          });

          console.log("Preview Response:", previewResponse);

          if (!previewResponse?.data?.previewData) {
            throw new Error("Invalid preview voucher data structure");
          }

          const previewData = previewResponse.data.previewData;
          console.log("Preview Data:", previewData);

          const previewVoucher: Voucher = {
            id: previewResponse.data.sessionId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            title: previewData.title,
            voucherCode: previewData.voucherCode,
            description: previewData.description,
            terms: previewData.terms || [],
            slug: previewData.slug,
            link: previewData.link,
            typeLink: previewData.typeLink,
          };

          setVoucher(previewVoucher);

          const partnerResponse = await api({
            url: `/partners/by_slug/${slug}`,
            method: "GET",
          });

          console.log("Partner Response:", partnerResponse);
          setPartner(partnerResponse.data);

          // Update document title and favicon
          document.title = partnerResponse.data.name;
          const favicon = document.querySelector(
            "link[rel='icon']"
          ) as HTMLLinkElement;
          if (favicon) favicon.href = partnerResponse.data.logoUrl;
        } else {
          const response = await api({
            url: `/vouchers/slug/${slugVoucher}`,
            method: "GET",
          });

          console.log("Raw API Response:", response);

          if (!response || !response.data || !response.data.partner) {
            throw new Error("Invalid voucher data structure");
          }

          console.log("Full Voucher Data:", response.data);
          console.log("Banners Data:", response.data.partner.banners);

          setVoucher(response.data);
          setPartner(response.data.partner);

          document.title = response.data.partner.name;
          const favicon = document.querySelector(
            "link[rel='icon']"
          ) as HTMLLinkElement;
          if (favicon) favicon.href = response.data.partner.logoUrl;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slugVoucher, slug, sessionId, isPreviewMode]);

  const whatsappLink = voucher
    ? isPreviewMode && voucher.link
      ? voucher.link
      : `https://api.whatsapp.com/send/?text=Hi! I'd like to redeem my voucher code: ${voucher.voucherCode} for ${voucher.title}&type=custom_url&app_absent=0`
    : "#";

  const scrollToVoucherCode = () => {
    const element = document.getElementById("voucher-code");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToVoucherManagement = () => {
    window.close();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !partner || !voucher) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Voucher Tidak Ditemukan
        </h1>
        <p className="text-gray-600 text-base">
          Maaf, voucher yang kamu cari tidak tersedia atau sudah tidak berlaku.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Mode Indicator and Back Button */}
      {isPreviewMode && (
        <div className="bg-orange-100 border-b border-orange-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-orange-800">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium text-sm sm:text-base">
                    Mode Preview
                  </span>
                  <span className="text-xs sm:text-sm text-orange-600">
                    - Ini adalah tampilan preview voucher Anda
                  </span>
                </div>
              </div>
              <button
                onClick={handleBackToVoucherManagement}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 sm:px-4 rounded-md transition-colors text-xs sm:text-sm font-medium w-full sm:w-auto justify-center"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Kembali ke Voucher Management
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden">
        <Banner banners={partner.banners} />
      </section>

      {/* Voucher Code Section */}
      <section id="voucher-code" className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <VoucherCard partner={partner} voucher={voucher} />
        </div>
      </section>

      {/* How To Redeem Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 mb-8 sm:mb-12 lg:mb-20">
          <HowToRedeem />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQ faqs={partner?.faqs || []} />
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <TermsAndConditions terms={voucher?.terms || []} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
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
              <span className="text-lg sm:text-xl font-bold">Bumame</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 text-center">
              <span>
                © {new Date().getFullYear()} Bumame. All rights reserved.
              </span>
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
