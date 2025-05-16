"use client"

import { useState, useEffect } from "react"

export default function TermsAndConditions() {
    const [termsContent, setTermsContent] = useState<string>("")

    useEffect(() => {
        // Simulasi data dari database (nanti diganti dengan fetch API)
        const mockTermsData = `
            <h3 class="font-medium text-lg mb-4">1. Acceptance of Terms</h3>
            <p class="mb-4">By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3 class="font-medium text-lg mb-4">2. Changes to Terms</h3>
            <p class="mb-4">We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page.</p>
            
            <h3 class="font-medium text-lg mb-4">3. User Responsibilities</h3>
            <p class="mb-4">You are responsible for your use of the service and for any consequences thereof. You agree to use the service in compliance with all applicable laws and regulations.</p>
            
            <h3 class="font-medium text-lg mb-4">4. Limitation of Liability</h3>
            <p class="mb-4">We shall not be liable for any damages or losses arising from your use of the service.</p>

            <h3 class="font-medium text-lg mb-4">5. Additional Information</h3>
            <p class="mb-4">Here are some additional terms:</p>
            <ul class="list-disc pl-5 mb-4">
                <li class="mb-2">Term 1: Description of term 1.</li>
                <li class="mb-2">Term 2: Description of term 2.</li>
                <li class="mb-2">Term 3: Description of term 3.</li>
            </ul>
            <p class="mb-4">And here are some numbered terms:</p>
            <ol class="list-decimal pl-5 mb-4">
                <li class="mb-2">First term: Description of the first term.</li>
                <li class="mb-2">Second term: Description of the second term.</li>
                <li class="mb-2">Third term: Description of the third term.</li>
            </ol>
            
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p class="font-semibold text-blue-800">Important Notice:</p>
                <p>These terms are legally binding. Please read them carefully.</p>
            </div>
        `
        setTermsContent(mockTermsData)
    }, [])

    return (
        <div className="mx-16 rounded-lg px-4 py-12 max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-bold  text-[#1a1a5c] mb-6">
                Terms of Service
            </h1>

            <div className=" rounded-lg p-6 md:p-8 ">
                <div
                    className="terms-content"
                    dangerouslySetInnerHTML={{ __html: termsContent }}
                />
            </div>
        </div>
    )
}