"use client"
import React from 'react';
import { Calendar } from 'lucide-react';

const TestDriveButton = () => {
  const handleClick = () => {
    const phoneNumber = '+5491124663784';
    const message = 'Hola! Me gustaría programar una prueba de manejo.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <button
      onClick={handleClick}
      className="flex-1 bg-card-foreground dark:bg-gray-200 hover:bg-backgroundsecond dark:hover:bg-gray-300 text-white dark:text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
    >
      <Calendar className="w-5 h-5" />
      Schedule Test Drive
    </button>
  );
};

export default TestDriveButton;