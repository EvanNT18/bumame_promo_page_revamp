"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

// Import type/interface
import { Partner, Voucher } from "@/types/Partner";

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

  // WhatsApp link menggunakan voucherCode
  const whatsappLink = `https://api.whatsapp.com/send/?phone=6281119088808&text=Hi+Bumame%2C+I+want+to+redeem+my+code%3A+${encodeURIComponent(
    voucher.voucherCode
  )}`;

  // Custom link dari database
  const customLink = voucher.link || "";

  const handleRedeem = () => {
    const link = voucher.typeLink === "wa" ? whatsappLink : customLink;

    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="px-4">
      {/* Centered content with left/right spacing */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Exclusive Voucher
        </h2>
        <p className="text-gray-600">
          Copy this code and share it with our team to claim your discount
        </p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-[50%] mx-auto">
        <Card className="bg-white shadow-xl border-0 overflow-hidden w-full">
          <CardContent className="p-8">
            <div className="text-center">
              <Badge className="bg-purple-600 text-white px-4 py-2 text-sm mb-6">
                {partner.name || "Partner"}
              </Badge>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Special Discount {voucher.title ?? ""}
              </h3>

              <p className="text-gray-600 mb-8">
                {voucher.description || "No description available."}
              </p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-purple-600">
                    Voucher Code
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!voucher.voucherCode}
                    className={`text-purple-600 hover:text-purple-700 ${
                      !voucher.voucherCode
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                  <code className="text-2xl font-bold text-purple-600 tracking-wider">
                    {voucher.voucherCode || "N/A"}
                  </code>
                </div>
              </div>

              {/* Tombol Redeem Dinamis */}
              <Button
                className={`w-full py-3 rounded-full text-lg flex items-center justify-center gap-2 ${
                  voucher.typeLink === "wa"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onClick={handleRedeem}
                disabled={voucher.typeLink === "custom" && !customLink} // disable jika custom tapi link kosong
                aria-label={
                  voucher.typeLink === "wa"
                    ? "Open WhatsApp to redeem voucher"
                    : "Visit custom link to redeem voucher"
                }
              >
                {voucher.typeLink === "wa" ? (
                  <>
                    <span>Redeem on WhatsApp</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    <span>Visit Custom Link</span>
                  </>
                )}
              </Button>

              {/* Pesan jika link tidak tersedia untuk custom */}
              {voucher.typeLink === "custom" && !customLink && (
                <p className="text-red-500 mt-2">Custom link not available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
