"use client"

import { Terms } from "@/types/Partner"
import { useState, useEffect } from "react"

export default function TermsAndConditions({
    terms
} : {
    terms : Terms[]
}) {
    const [termsContent, setTermsContent] = useState<string>("")

    return (
        <div className="mx-auto rounded-lg px-4 py-12 max-w-7xl">
            <h1 className="text-2xl md:text-4xl font-bold text-center text-[#1a1a5c] mb-12">
                Terms of Service
            </h1>

            <div className="rich-text-content terms-content rounded-lg p-6 md:p-8">
                {terms.map((term, index) => (
                    <div key={index} className="text-gray-500 mb-4" dangerouslySetInnerHTML={{ __html: term.text }}>
                    </div>
                ))}
            </div>
        </div>
    )
}