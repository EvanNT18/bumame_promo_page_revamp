"use client";

import type { Terms } from "@/types/Partner";

interface TermsAndConditionsProps {
  terms: Terms[];
}

export default function TermsAndConditions({ terms }: TermsAndConditionsProps) {
  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-gray-500 text-sm sm:text-base">
          No terms and conditions available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Terms & Conditions
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
          Please read the following terms carefully before redeeming your
          voucher.
        </p>
      </div>

      <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
        {terms.map((term) => (
          <div
            key={term.id}
            className="prose prose-sm sm:prose-base prose-li:marker:text-black max-w-none text-gray-700 [&>*]:text-sm [&>*]:sm:text-base"
            dangerouslySetInnerHTML={{ __html: term.text }}
          />
        ))}
      </div>
    </div>
  );
}
