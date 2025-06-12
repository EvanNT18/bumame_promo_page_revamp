import { Card, CardContent } from "@/components/ui/card";
import { Clipboard, MessageSquare, Share2 } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Copy Your Code",
    description: "Tap the copy button to save your voucher code",
    icon: Clipboard,
    color: "bg-purple-100 text-purple-600",
  },
  {
    number: 2,
    title: "Contact via WhatsApp",
    description: "Click the WhatsApp button to start your conversation",
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-600",
  },
  {
    number: 3,
    title: "Share Your Code",
    description: "Paste your voucher code in the chat to apply discount",
    icon: Share2,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HowToRedeem() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How to Redeem Your Voucher
        </h2>
        <p className="text-gray-600 text-lg">
          Follow these simple steps to claim your discount
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center"
          >
            {/* Step Number */}
            <div className="flex justify-center mb-6 relative w-full">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold z-10">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
              )}
            </div>

            {/* Step Card */}
            <Card className="bg-white border-0 h-full shadow-md w-full">
              <CardContent className="p-6 flex flex-col items-center h-full">
                <div
                  className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm text-center">
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
