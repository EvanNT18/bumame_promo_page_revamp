"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

// Import type/interface
import type { Partner, Voucher } from "@/types/Partner";

interface VoucherCardProps {
  partner: Partner;
  voucher: Voucher;
}

export default function VoucherCard({ partner, voucher }: VoucherCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!voucher.voucherCode) return;

    navigator.clipboard.writeText(voucher.voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp link using voucherCode
  const whatsappLink = `https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+${encodeURIComponent(
    voucher.voucherCode
  )}`;

  // Custom link from database
  const customLink = voucher.link || "";

  const handleRedeem = () => {
    const link = voucher.typeLink === "wa" ? whatsappLink : customLink;

    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="px-4">
      {/* Card Container - Responsive width */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        <Card className="bg-white shadow-xl border-0 overflow-hidden w-full">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Special Discount {voucher.title ?? ""}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
                {voucher.description || "No description available."}
              </p>

              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-[#204fab]">
                    Voucher Code
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!voucher.voucherCode}
                    className={`text-[#204fab] hover:text-[#204fab] text-xs sm:text-sm p-1 sm:p-2 ${
                      !voucher.voucherCode
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border-2 border-dashed border-gray-200">
                  <code className="text-lg sm:text-xl lg:text-2xl font-bold text-[#204fab] tracking-wider break-all">
                    {voucher.voucherCode || "N/A"}
                  </code>
                </div>
              </div>

              {/* Dynamic Redeem Button */}
              <Button
                className={`w-full py-2.5 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 ${
                  voucher.typeLink === "wa"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-[#204fab] hover:bg-[#204fab] text-white"
                }`}
                onClick={handleRedeem}
                disabled={voucher.typeLink === "custom" && !customLink}
                aria-label={
                  voucher.typeLink === "wa"
                    ? "Open WhatsApp to redeem voucher"
                    : "Visit custom link to redeem voucher"
                }
              >
                {voucher.typeLink === "wa" ? (
                  <>
                    <span className="hidden sm:inline">Redeem on WhatsApp</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Visit to Redeem</span>
                    <span className="sm:hidden">Visit to Redeem</span>
                  </>
                )}
              </Button>

              {/* Error message for unavailable custom link */}
              {voucher.typeLink === "custom" && !customLink && (
                <p className="text-red-500 mt-2 text-xs sm:text-sm">
                  Custom link not available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
