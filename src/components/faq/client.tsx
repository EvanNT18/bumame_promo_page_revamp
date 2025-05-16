"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { FAQ } from "@/types/Partner"

export default function FAQPage({
    faqs
} : {
    faqs: FAQ[]
}) {
    const [expandedItem, setExpandedItem] = useState(0)


    const handleItemClick = (index: number) => {
        setExpandedItem(expandedItem === index ? -1 : index)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-[#1a1a5c] mb-12">Frequently Asked Questions</h1>

            {/* FAQ Items */}
            <div className="space-y-4">
                {faqs.map((faq,index) => (
                    <div
                        key={index}
                        className={`rounded-lg overflow-hidden py-2 transition-all duration-300 ${expandedItem === index ? "border border-gray-200 text-black" : "border border-gray-200 text-black"
                            }`}
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center"
                            onClick={() => handleItemClick(index)}
                        >
                            <span className="font-medium text-lg">{faq.question}</span>
                            {expandedItem === index ? (
                                <Minus className="h-5 w-5 flex-shrink-0" />
                            ) : (
                                <Plus className="h-5 w-5 flex-shrink-0" />
                            )}
                        </button>
                        {expandedItem === index && (
                            <div className="px-6 py-4 pb-4">
                                <div className="border my-2"></div>
                                <p className="text-gray-500">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
