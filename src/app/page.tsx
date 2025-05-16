;
import Banner from "../components/banner/client";
import FAQ from "@/components/faq/client";
import TermsAndConditions from "@/components/terms-and-condition/client";
import Subtitle from "@/components/subtitle/client";
import VoucherCode from "@/components/voucher/client";
import HowToRedeem from "@/components/how-to-reedem/client";
import CouponPage from "@/components/coupon/coupon";


export default function LandingPagePromo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4">
      </div>
      <Banner />
      <Subtitle />
      <CouponPage />
      <HowToRedeem />
      <TermsAndConditions />
      <FAQ />
    </div>
  );
}
