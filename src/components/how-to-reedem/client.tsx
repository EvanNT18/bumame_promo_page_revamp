"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function HowToRedeem() {
  const steps = [
    {
      title: 'Click "Reedem on WhatsApp"',
      description: "Tap the button at the top of this page to open WhatsApp.",
      icon: <CheckCircle className="text-green-500" />,
      image: "/reedem/step1.png",
    },
    {
      title: "Check Pre-filled Message",
      description:
        "Verify that your voucher code appears in the WhatsApp message.",
      icon: <CheckCircle className="text-green-500" />,
      image: "/reedem/step2.png",
    },
    {
      title: "Send the Message",
      description: "Send the pre-filled message to Bumame Customer Service.",
      icon: <CheckCircle className="text-green-500" />,
      image: "/reedem/step3.png",
    },
    {
      title: "Enjoy Your Discount",
      description: "Your discount will be applied to eligible service.",
      icon: <CheckCircle className="text-green-500" />,
      image: "/reedem/step4.png",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        How to redeem your code
      </h2>

      <div className="space-y-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-28 items-center`}
          >
            {/* Image container - replace src with your actual image */}
            <div className="rounded-xl overflow-hidden w-[250px] md:w-1/2 min-h-[250px] relative">
              <img
                src={step.image}
                alt={`Step ${index + 1} illustration`}
                className="object-cover"
              />
            </div>

            {/* Text content */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
