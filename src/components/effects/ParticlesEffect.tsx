"use client";
import { useCallback } from "react";
import { tsParticles } from "tsparticles-engine"; 
import { loadSlim } from "tsparticles-slim"; 
import Particles from "react-tsparticles";

const ParticlesEffect: React.FC = () => {
  const particlesInit = useCallback(async () => {
    await loadSlim(tsParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10"> {/* Contenedor fijo con z-index negativo */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false }, // Cambiado a false para usar el contenedor
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { 
              value: 580, 
              density: { 
                enable: true, 
                value_area: 1500 
              } 
            },
            color: { 
              value: ["#da291c", "#ff4500", "#b71c1c", "#ff6600"] 
            },
            shape: { 
              type: "circle" 
            },
            opacity: {
              value: 0.7,
              random: true,
              anim: { 
                enable: true, 
                speed: 0.3,
                opacity_min: 0.2, 
                sync: false 
              },
            },
            size: {
              value: 2,
              random: true,
              anim: { 
                enable: true, 
                speed: 1,
                size_min: 0.5, 
                sync: false 
              },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce"
              },
              attract: { 
                enable: true,
                rotateX: 300,
                rotateY: 600
              }
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.03,
                opacity: 0.8,
              },
            },
            life: {
              duration: { 
                value: 6,
                sync: false
              },
              count: 0,
            },
          },
          retina_detect: false,
        }}
        className="h-full w-full pointer-events-none"
      />
    </div>
  );
};

export default ParticlesEffect;