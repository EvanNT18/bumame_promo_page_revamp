export default async function logoColorExtractor(url: string): Promise<string> {
    // Load image
    const img = await loadImage(url);
    // Draw to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Get pixel data
    const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);

    // Count colors
    const colorCounts: Record<string, number> = {};
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 128) continue; // skip transparent
        // Ignore near-white, near-black, and low-saturation
        const [h, s, l] = rgbToHsl(r, g, b);
        if (s < 0.3 || l < 0.15 || l > 0.85) continue;
        const key = `${r},${g},${b}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
    }

    // Find the most saturated, frequent color
    let primaryColor = '';
    let maxScore = -1;
    for (const key in colorCounts) {
        const [r, g, b] = key.split(',').map(Number);
        const [h, s, l] = rgbToHsl(r, g, b);
        // Score: frequency * saturation
        const score = colorCounts[key] * s;
        if (score > maxScore) {
            maxScore = score;
            primaryColor = key;
        }
    }

    if (!primaryColor) {
        // fallback: just pick the most frequent color
        let maxCount = -1;
        for (const key in colorCounts) {
            if (colorCounts[key] > maxCount) {
                maxCount = colorCounts[key];
                primaryColor = key;
            }
        }
    }

    if (!primaryColor) return '#000000'; // fallback

    const [r, g, b] = primaryColor.split(',').map(Number);
    return rgbToHex(r, g, b);
}

// Util: Get contrasting color based on hex
export function getContrastingColor(hex: string): string {
    // Remove hash if present
    hex = hex.replace(/^#/, '');

    // Parse r, g, b
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else {
        throw new Error('Invalid hex color');
    }

    // Calculate luminance (YIQ formula)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black or white
    return yiq >= 128 ? '#000000' : '#ffffff';
}

// Helper: load image
function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = `${process.env.NEXT_PUBLIC_API_URL!}/proxy?url=${encodeURIComponent(url)}`;
    });
}

// Helper: RGB to HSL
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// Helper: RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}