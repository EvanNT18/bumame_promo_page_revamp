"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Gift, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import HeroBanner from "@/components/hero-banner/client";
import VoucherCard from "@/components/couponPage/coupon";
import HowToRedeem from "@/components/how-to-reedem/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import api from "@/lib/api";
import { Partner, Voucher } from "@/types/Partner";

export default function PromoLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [partner, setPartner] = useState<Partner | null>(null);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoucherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api({
          url: `/vouchers/slug/${slug}`,
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
      } catch (err) {
        console.error("Error fetching voucher:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVoucherData();
  }, [slug]);

  const whatsappLink = voucher
    ? `https://api.whatsapp.com/send/?text=Hi! I'd like to redeem my voucher code: ${voucher.voucherCode} for ${voucher.title}&type=custom_url&app_absent=0`
    : "#";

  const scrollToVoucherCode = () => {
    const element = document.getElementById("voucher-code");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading || !partner || !voucher) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <HeroBanner
        partner={partner}
        voucher={voucher}
        whatsappLink={whatsappLink}
        onViewCodeClick={scrollToVoucherCode}
      />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Exclusive Discount
              </h3>
              <p className="text-gray-600">
                Special pricing available only for members
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Limited Time
              </h3>
              <p className="text-gray-600">Valid for 30 days from activation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure & Trusted
              </h3>
              <p className="text-gray-600">
                Verified partner with guaranteed service quality
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voucher Code Section */}
      <section id="voucher-code" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <VoucherCard partner={partner} voucher={voucher} />
        </div>
      </section>

      {/* How To Redeem Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 mb-20">
          <HowToRedeem />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FAQ faqs={partner?.faqs || []} />
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <TermsAndConditions terms={voucher?.terms || []} />
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
