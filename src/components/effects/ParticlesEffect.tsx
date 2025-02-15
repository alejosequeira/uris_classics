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
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: ["#da291c", "#ff4500", "#b71c1c", "#ff6600"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.7,
            random: true,
            anim: { enable: true, speed: 0.5, opacity_min: 0.2, sync: false },
          },
          size: {
            value: 2,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.5, sync: false },
          },
          move: {
            enable: true,
            speed: 2.5,
            direction: "top",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
          life: {
            duration: { value: 2 },
            count: 0,
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ParticlesEffect;