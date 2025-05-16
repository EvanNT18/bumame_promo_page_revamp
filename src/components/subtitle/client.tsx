"use client"
import { Subtitle } from "@/types/Partner"
import React from "react"

export default function SubtitlePage({
    subtitles
} : {
    subtitles: Subtitle[]
}) {
    return (
        <div className="mx-auto px-4 py-8">
            {subtitles.map((subtitle, index) => (
                <div
                key={index}
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: subtitle.text }}
                style={{
                    maxWidth: '42rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center'
                }}
                ></div>
            ))}
        </div>
    )
}