"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import type/interface
import { FAQ } from "@/types/Partner"; // Pastikan interface ini ada

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQComponent({ faqs }: FAQProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No FAQs available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg">
          Everything you need to know about your voucher
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.id || `faq-${index}`}
            value={`item-${index}`}
            className="bg-white border border-gray-200 rounded-lg px-6"
          >
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
