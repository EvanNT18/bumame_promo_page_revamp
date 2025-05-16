"use client";

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed right-6 bottom-24 z-50 flex flex-col items-center gap-1 text-gray-600"
            aria-label="Scroll to top"
        >
            <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,1)] text-[#204eab] p-5 rounded-xl shadow-md transition-colors cursor-pointer">
              <ArrowUp className="h-6 w-6" />
            </div>
        </button>
    );
};

export default ScrollToTop;