"use client";

import { Button } from "@/components/ui/button";
import { Send, ExternalLink } from "lucide-react";

interface VoucherActionsProps {
  voucherLink: string | null;
  typeLink: "wa" | "custom";
  scrollToVoucherCode: () => void;
}

export default function VoucherActions({
  voucherLink,
  typeLink,
  scrollToVoucherCode,
}: VoucherActionsProps) {
  const handleRedeem = () => {
    if (!voucherLink) {
      scrollToVoucherCode();
      return;
    }
    window.open(voucherLink, "_blank");
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Tombol berdasarkan typeLink */}
        {typeLink === "wa" ? (
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg rounded-full flex items-center gap-2"
            onClick={handleRedeem}
          >
            <Send className="w-6 h-6" /> Redeem Now on WhatsApp
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-full flex items-center gap-2"
            onClick={handleRedeem}
          >
            <ExternalLink className="w-6 h-6" /> Visit To Redeem
          </Button>
        )}

        {/* Tombol Lihat Kode Voucher tetap sama */}
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-[rgba(255, 255, 255, 0.8)] hover:text-black px-8 py-4 text-lg rounded-full backdrop-blur-sm transition duration-300 ease-in-out"
          onClick={scrollToVoucherCode}
        >
          View Voucher Code
        </Button>
      </div>
    </div>
  );
}
