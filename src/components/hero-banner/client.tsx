"use client";

import Image from "next/image";
import VoucherActions from "@/components/voucher-actions/client";
import BannerPage from "@/components/banner/client";
import { Badge } from "@/components/ui/badge";

interface HeroBannerProps {
  partner: any;
  voucher: any;
  whatsappLink: string;
  onViewCodeClick: () => void;
}

export default function HeroBanner({
  partner,
  voucher,
  whatsappLink,
  onViewCodeClick,
}: HeroBannerProps) {
  return (
    <div className="relative">
      {/* Banner Slider */}
      <BannerPage banners={partner.banners} />

      {/* Overlay Konten - hanya teks dan tombol utama */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="text-center text-white px-4 max-w-4xl mx-auto pointer-events-auto flex flex-col items-center justify-center">
          {/* Geser Badge ke atas */}
          <div className="mt-2 mb-52">
            {" "}
            {/* Tambahkan margin top (mt-8) */}
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm rounded-full"
            >
              ⭐ Exclusive from {partner.name}
            </Badge>
          </div>

          {/* Tombol utama */}
          <VoucherActions
            voucherLink={voucher.link}
            typeLink={voucher.typeLink}
            scrollToVoucherCode={onViewCodeClick}
          />
        </div>
      </div>
    </div>
  );
}
