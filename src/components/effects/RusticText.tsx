"use client";
import React, { useMemo } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

interface RusticTextProps {
  text: string;
  className?: string;
  textSize?: string;
}

const RusticText: React.FC<RusticTextProps> = ({ 
  text, 
  className,
  textSize = "clamp(2.5rem, 6vw, 6rem)" // valor por defecto
}) => {
  // Memoizamos los estilos que no cambian
  const staticStyles = useMemo(() => ({
    text: {
      fontFamily: "Playfair Display, serif",
      textShadow: "0 0 10px rgba(255,0,0,0.3), 0 0 15px rgba(255,0,0,0.2)",
      fontSize: textSize
    },
    shadow: {
      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 80%)"
    },
    vibration: {
      backgroundImage: "url('/images/textures/frente_mustang_viejo.jpg')",
      backgroundPosition: "center",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      opacity: 0.4,
      mixBlendMode: "color-burn" as const,
      maskImage: "radial-gradient(black 40%, transparent 75%)"
    }
  }), [textSize]);

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        className={`relative z-10 text-[var(--brand)] tracking-wider text-shadow-rustic ${playfair.className}`}
        style={staticStyles.text}
      >
        {text}
      </span>

      <div
        className="absolute inset-0 blur-sm opacity-30"
        style={staticStyles.shadow}
      />

      <div
        className="absolute inset-0 animate-rusticVibration"
        style={staticStyles.vibration}
      />
    </div>
  );
};

export default RusticText;