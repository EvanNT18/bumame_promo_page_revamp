"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

export default function FAQ() {
    const [expandedItem, setExpandedItem] = useState(0)

    const faqItems = [
        {
            question: "Apa itu COVID-19?",
            answer:
                "COVID-19 adalah penyakit yang disebabkan oleh virus corona baru yang pertama kali diidentifikasi di Wuhan, China. Penyakit ini dapat menyebabkan gejala ringan hingga berat, termasuk demam, batuk, dan kesulitan bernapas.",
        },
        {
            question: "Bagaimana cara mencegah penularan COVID-19?",
            answer:
                "Cara terbaik untuk mencegah penularan COVID-19 adalah dengan mencuci tangan secara teratur, menjaga jarak fisik, memakai masker, dan menghindari kerumunan.",
        },
        {
            question: "Apa saja gejala umum dari COVID-19?",
            answer:
                "Gejala umum COVID-19 meliputi demam, batuk kering, dan kelelahan. Beberapa orang juga mungkin mengalami nyeri otot, sakit tenggorokan, diare, konjungtivitis, sakit kepala, kehilangan rasa atau bau, ruam pada kulit, atau perubahan warna pada jari tangan atau kaki.",
        },
        {
            question: "Kapan saya harus mencari bantuan medis?",
            answer:
                "Anda harus mencari bantuan medis segera jika mengalami kesulitan bernapas, nyeri atau tekanan di dada, kehilangan kemampuan berbicara atau bergerak, atau kebingungan. Gejala ini bisa menjadi tanda kondisi serius yang memerlukan perawatan segera.",
        },
    ]

    const handleItemClick = (index: number) => {
        setExpandedItem(expandedItem === index ? -1 : index)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-[#1a1a5c] mb-12">Frequently Asked Questions</h1>

            {/* FAQ Items */}
            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className={`rounded-lg overflow-hidden py-2 transition-all duration-300 ${expandedItem === index ? "border border-gray-200 text-black" : "border border-gray-200 text-black"
                            }`}
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center"
                            onClick={() => handleItemClick(index)}
                        >
                            <span className="font-medium text-lg">{item.question}</span>
                            {expandedItem === index ? (
                                <Minus className="h-5 w-5 flex-shrink-0" />
                            ) : (
                                <Plus className="h-5 w-5 flex-shrink-0" />
                            )}
                        </button>
                        {expandedItem === index && (
                            <div className="px-6 py-4 pb-4">
                                <div className="border my-2"></div>
                                <p className="text-gray-500">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
