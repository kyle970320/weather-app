import * as THREE from "three";
import { createRain, createSnow, createMusicNotes } from "@/entity/particle";
export const useGetParticle = () => {
  const updateRain = (particles: THREE.Points[], deltaTime: number) => {
    return particles.forEach((particle) => {
      const positions = particle.geometry.attributes.position
        .array as Float32Array;
      const velocities = particle.geometry.attributes.velocity
        .array as Float32Array;

      for (let i = 0; i < velocities.length; i++) {
        const yIndex = i * 3 + 1;
        positions[yIndex] -= velocities[i] * (deltaTime * 0.06);

        if (positions[yIndex] < -5) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[yIndex] = 15 + Math.random() * 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      particle.geometry.attributes.position.needsUpdate = true;
    });
  };

  const updateSnow = (particles: THREE.Points[], deltaTime: number) => {
    particles.forEach((particle) => {
      const positions = particle.geometry.attributes.position
        .array as Float32Array;
      const velocities = particle.geometry.attributes.velocity
        .array as Float32Array;

      for (let i = 0; i < velocities.length; i++) {
        const yIndex = i * 3 + 1;
        positions[yIndex] -= velocities[i] * (deltaTime * 0.03);

        if (positions[yIndex] < -5) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[yIndex] = 15 + Math.random() * 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      particle.geometry.attributes.position.needsUpdate = true;
    });
  };

  const updateMusicNotes = (particles: THREE.Points[], deltaTime: number) => {
    particles.forEach((particle) => {
      const pos = particle.geometry.attributes.position.array as Float32Array;
      const vel = particle.geometry.attributes.velocity.array as Float32Array;
      const sway = particle.geometry.attributes.sway.array as Float32Array;

      for (let i = 0; i < vel.length; i++) {
        const base = i * 3;

        pos[base + 1] += vel[i] * deltaTime * 0.04;

        sway[i] += deltaTime * 0.002;
        pos[base] += Math.sin(sway[i]) * 0.01;

        if (pos[base + 1] > 6) {
          pos[base] = (Math.random() - 0.5) * 4;
          pos[base + 1] = -1;
          pos[base + 2] = (Math.random() - 0.5) * 4;
          sway[i] = Math.random() * Math.PI * 2;
        }
      }

      particle.geometry.attributes.position.needsUpdate = true;
    });
  };

  return {
    createRain,
    createSnow,
    createMusicNotes,
    updateRain,
    updateSnow,
    updateMusicNotes,
  };
};
