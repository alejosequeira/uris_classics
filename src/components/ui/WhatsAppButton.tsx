"use client"
import React from 'react';
import { useTheme } from 'next-themes';
import { PhoneCall, Instagram } from 'lucide-react';

const SocialButtons = () => {
    const { theme } = useTheme();
    
    const handleWhatsAppClick = () => {
        const phoneNumber = '+5491124663784';
        const message = 'Hola! Me interesa saber más sobre los autos clásicos.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    
    const handleInstagramClick = () => {
        window.open('https://instagram.com/motecarssales', '_blank');
    };
  
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
            {/* Botón de Instagram */}
            <button
                onClick={handleInstagramClick}
                className={`flex items-center gap-2 
                         rounded-xl border border-opacity-20
                         backdrop-blur-sm px-3 py-2
                         transition-all duration-500
                         hover:scale-105 group
                         ${theme === 'dark' 
                           ? 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-white hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
                           : 'bg-black/80 border-[var(--brand)] hover:shadow-[0_0_20px_rgba(229,57,53,0.3)]'
                         }`}
            >
                <Instagram 
                    className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110
                               ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}
                />
                <span className={`hidden md:block text-sm font-medium
                                ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}>
                    Instagram
                </span>
            </button>
            
            {/* Botón de WhatsApp */}
            <button
                onClick={handleWhatsAppClick}
                className={`flex items-center gap-2 
                         rounded-xl border border-opacity-20
                         backdrop-blur-sm px-3 py-2
                         transition-all duration-500
                         hover:scale-105 group
                         ${theme === 'dark' 
                           ? 'bg-green-600 hover:bg-green-700 border-white hover:shadow-[0_0_20px_rgba(22,163,74,0.5)]' 
                           : 'bg-black/80 border-[var(--brand)] hover:shadow-[0_0_20px_rgba(229,57,53,0.3)]'
                         }`}
            >
                 <div className={`
                    flex items-center justify-center
                    w-8 h-8 rounded-md
                    border-2 ${theme === 'dark' ? 'border-white' : 'border-[var(--brand)]'}
                    transition-transform duration-300 group-hover:rotate-12
                `}>
                    <PhoneCall 
                        className={`w-5 h-5
                                   ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}
                    />
                </div>
                <span className={`hidden md:block text-sm font-medium
                                ${theme === 'dark' ? 'text-white' : 'text-[var(--brand)]'}`}>
                    WhatsApp
                </span>
            </button>
        </div>
    );
};

export default SocialButtons;