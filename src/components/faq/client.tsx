"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import type/interface
import type { FAQ } from "@/types/Partner";

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQComponent({ faqs }: FAQProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-500 text-sm sm:text-base">
          No FAQs available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Everything you need to know about your voucher
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.id || `faq-${index}`}
            value={`item-${index}`}
            className="bg-white border border-gray-200 rounded-lg px-4 sm:px-6"
          >
            <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4 sm:py-6 text-sm sm:text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
