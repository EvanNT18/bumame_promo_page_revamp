"use client"

import { useState } from "react"

export default function VoucherCode() {
    const [code] = useState("EXCLUSIVE2025")
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const displayCode = code.length > 20 ? `${code.substring(0, 20)}...` : code

    return (
        <div className="mx-auto px-4 py-12 bg-blue-100">
            <h2 className="text-2xl font-bold text-center text-[#204eab] mb-2">Your Exclusive Voucher Code</h2>
            <p className="text-center text-[#2d58b0] max-w-2xl mx-auto mb-4">
                Use this code when chatting with our staff to claim your discount.
            </p>
            <div className="bg-white rounded-lg p-8 text-center relative max-w-md mx-auto cursor-pointer ticket" onClick={copyToClipboard}>
                <div className="text-3xl font-bold text-blue-500 group-hover:text-[#0d0d3c] transition-colors">
                    {displayCode}
                </div>
                {isCopied && (
                    <span className="absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Copied!
                    </span>
                )}
            </div>
            <p className="text-gray-500 text-sm mt-4 text-center">Click code to copy to clipboard</p>
            <div className="text-center mt-4">
                <a
                    href="https://wa.me/yourwhatsappnumber?text=I%20want%20to%20redeem%20the%20code%20EXCLUSIVE2025"
                    className="inline-block bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Redeem via WhatsApp
                </a>
            </div>
        </div>
    )
}
