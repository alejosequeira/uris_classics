"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import { PhoneCall } from 'lucide-react';

const WhatsAppButton = () => {
    const { theme } = useTheme();
    
    const handleClick = () => {
        const phoneNumber = '+1234567890';
        const message = 'Hola! Me interesa saber más sobre los autos clásicos.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
  
    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-6 right-6
                     flex items-center gap-2 
                     rounded-xl border border-opacity-20
                     backdrop-blur-sm px-4 py-3
                     transition-all duration-500 z-50
                     hover:scale-105 group
                     ${theme === 'dark' 
                       ? 'bg-green-600 hover:bg-green-700 border-white hover:shadow-[0_0_20px_rgba(22,163,74,0.5)]' 
                       : 'bg-black/80 border-[var(--brand)] hover:shadow-[0_0_20px_rgba(229,57,53,0.3)]'
                     }`}
        >
            <PhoneCall 
                className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-12
                           ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}
            />
            <span className={`hidden md:block text-sm font-medium
                            ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}>
                Contact Us
            </span>
        </button>
    );
};

export default WhatsAppButton;