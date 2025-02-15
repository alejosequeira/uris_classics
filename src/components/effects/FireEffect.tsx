"use client";
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const FireEffect: React.FC = () => {
  return (
    <Particles
      id="fireParticles"
      init={async (engine) => await loadSlim(engine)}
      options={{
        background: { color: "transparent" },
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } }, // Más partículas
          color: { value: ["#ff4500", "#ff8c00", "#ffa500", "#ff0000"] }, // Más tonos de fuego
          shape: { type: "circle" },
          opacity: {
            value: 0.7,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false },
          },
          size: {
            value: 1, // Tamaño más grande
            random: true,
            anim: { enable: true, speed: 5, size_min: 2, sync: false },
          },
          move: {
            enable: true,
            speed: 10, // Velocidad más rápida
            direction: "top", // Movimiento ascendente
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          glow: {
            enable: true,
            color: "#ff4500",
            blur: 10, // Agregar glow y blur
            opacity: 0.1,
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true,
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default FireEffect;