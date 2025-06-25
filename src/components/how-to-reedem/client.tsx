import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, MessageSquare, Share2 } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Copy Your Code",
    description: "Tap the copy button to save your voucher code",
    icon: Clipboard,
    color: "bg-blue-100 text-[#204fab]",
  },
  {
    number: 2,
    title: "Contact via WhatsApp",
    description: "Click the WhatsApp button to start your conversation",
    icon: MessageSquare,
    color: "bg-blue-100 text-[#204fab]",
  },
  {
    number: 3,
    title: "Share Your Code",
    description: "Paste your voucher code in the chat to apply discount",
    icon: Share2,
    color: "bg-blue-100 text-[#204fab]",
  },
];

export default function HowToRedeem() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          How to Redeem Your Voucher
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Follow these simple steps to claim your discount
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center"
          >
            {/* Step Number with connecting line */}
            <div className="flex justify-center mb-4 sm:mb-6 relative w-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#204fab] text-white rounded-full flex items-center justify-center text-sm sm:text-lg font-bold z-10">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 sm:top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
              )}
            </div>

            {/* Step Card */}
            <Card className="bg-white border-0 h-full shadow-md w-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center h-full text-center">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${step.color} rounded-full flex items-center justify-center mb-3 sm:mb-4`}
                >
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
