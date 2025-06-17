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
    <div className="w-full max-w-xs sm:max-w-2xl mx-auto">
      <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
        {/* Primary action button - style asli */}
        {typeLink === "wa" ? (
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 sm:px-8 sm:py-4 text-xs sm:text-lg rounded-full flex items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none sm:min-w-[200px] shadow-lg"
            onClick={handleRedeem}
          >
            <Send className="w-3 h-3 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Redeem Now on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-8 sm:py-4 text-xs sm:text-lg rounded-full flex items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none sm:min-w-[200px] shadow-lg"
            onClick={handleRedeem}
          >
            <ExternalLink className="w-3 h-3 sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Visit To Redeem</span>
            <span className="sm:hidden">Visit</span>
          </Button>
        )}

        {/* Secondary action button - kembali ke style asli */}
        <Button
          size="sm"
          variant="outline"
          className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white px-2 py-1 sm:px-8 sm:py-4 text-xs sm:text-lg rounded-full backdrop-blur-sm transition duration-300 ease-in-out flex-1 sm:flex-none sm:min-w-[200px] shadow-lg"
          onClick={scrollToVoucherCode}
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          <span className="hidden sm:inline">View Voucher Code</span>
          <span className="sm:hidden">View Code</span>
        </Button>
      </div>
    </div>
  );
}
