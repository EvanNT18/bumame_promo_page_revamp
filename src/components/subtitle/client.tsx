"use client";
import { Subtitle } from "@/types/Partner";
import React from "react";

export default function SubtitlePage({ subtitles }: { subtitles: Subtitle[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto px-4 py-6">
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: subtitle.text }}
            style={{
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
