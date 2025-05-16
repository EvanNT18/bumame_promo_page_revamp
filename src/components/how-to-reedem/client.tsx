"use client"

import { CheckCircle } from "lucide-react"

export default function HowToRedeem() {
    const steps = [
        {
            title: 'Click "Reedem on WhatsApp"',
            description: "Tap the button at the top of this page to open WhatsApp.",
            icon: <CheckCircle className="text-green-500" />
        },
        {
            title: "Check Pre-filled Message",
            description: "Verify that your voucher code appears in the WhatsApp message.",
            icon: <CheckCircle className="text-green-500" />
        },
        {
            title: "Send the Message",
            description: "Send the pre-filled message to Bumame Customer Service.",
            icon: <CheckCircle className="text-green-500" />
        },
        {
            title: "Enjoy Your Discount",
            description: "Your discount will be applied to eligible service.",
            icon: <CheckCircle className="text-green-500" />
        }
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12">How to redeem your code</h2>

            <div className="space-y-16">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-28 items-center`}
                    >
                        {/* Image placeholder - replace with your actual image */}
                        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center w-full md:w-1/2 min-h-[250px]">
                            <div className="text-center">
                                <div className="text-5xl mb-4">📱</div>
                                <p className="text-gray-500">Step {index + 1} screenshot</p>
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="w-full md:w-1/2 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {step.icon}
                                </div>
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
    )
}