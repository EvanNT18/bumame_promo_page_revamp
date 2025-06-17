"use client";
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

      {/* Badge - posisi diturunkan */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none sm:top-16">
        <Badge
          variant="secondary"
          className="bg-white/20 text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full backdrop-blur-sm pointer-events-auto"
        >
          ⭐ Exclusive from {partner.name}
        </Badge>
      </div>

      {/* Action buttons - posisi tetap */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto w-full max-w-xs sm:max-w-2xl sm:bottom-16">
        <VoucherActions
          voucherLink={voucher.link}
          typeLink={voucher.typeLink}
          scrollToVoucherCode={onViewCodeClick}
        />
      </div>
    </div>
  );
}
