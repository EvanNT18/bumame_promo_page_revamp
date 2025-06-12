"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
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

  const whatsappLink = `https://api.whatsapp.com/send/?text=Hi! I'd like to redeem my voucher code: ${voucher.voucherCode} for ${voucher.title}&type=custom_url&app_absent=0`;

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

              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full text-lg"
                onClick={() => window.open(whatsappLink, "_blank")}
                disabled={!voucher.voucherCode}
              >
                {voucher.voucherCode
                  ? "Redeem on WhatsApp"
                  : "Code Not Available"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
