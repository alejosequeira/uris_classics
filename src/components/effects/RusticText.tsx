"use client";
import React from "react";
import FireEffect from "@/components/effects/FireEffect";

interface RusticTextProps {
  text: string;
  className?: string;
}

const RusticText: React.FC<RusticTextProps> = ({ text, className }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Texto Principal */}
      <span
        className="relative z-10 text-[var(--brand)] tracking-wider text-shadow-rustic"
        style={{
          fontFamily: "Playfair Display, serif",
          textShadow: "0 0 10px rgba(255,0,0,0.3), 0 0 15px rgba(255,0,0,0.2)",
        }}
      >
        {text}
      </span>
      <FireEffect />

      {/* Sombra rugosa */}
      <div
        className="absolute inset-0 blur-sm opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 80%)",
        }}
      ></div>
      

      {/* Vibración animada */}
      <div
  className="absolute inset-0 animate-rusticVibration"
  style={{
    backgroundImage: "url('/images/textures/frente_mustang_viejo.jpg')",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    opacity: 0.4,
    mixBlendMode: "color-burn",
    maskImage: "radial-gradient( black 40%, transparent 75%)",
  }}
></div>
    </div>
  );
};

export default RusticText;