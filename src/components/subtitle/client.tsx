"use client"

export default function Subtitle() {
    const staticContent = `
    <h2 class="text-3xl font-semibold text-[#1a1a5c] mb-4">Welcome to Our Premium Service</h2>
    <p class="mb-6">We are committed to providing you with the best experience possible.</p>
  `;

    return (
        <div className="mx-auto px-4 py-8">
            <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: staticContent }}
                style={{
                    maxWidth: '42rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center'
                }}
            />
        </div>
    )
}