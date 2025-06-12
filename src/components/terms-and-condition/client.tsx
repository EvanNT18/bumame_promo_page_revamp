"use client";

import { Terms } from "@/types/Partner"; // Pastikan interface ini ada

interface TermsAndConditionsProps {
  terms: Terms[];
}

export default function TermsAndConditions({ terms }: TermsAndConditionsProps) {
  if (!terms || terms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No terms and conditions available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read the following terms carefully before redeeming your
          voucher.
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
        <ul className="space-y-4">
          {terms.map((term) => (
            <li key={term.id} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: term.text }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
