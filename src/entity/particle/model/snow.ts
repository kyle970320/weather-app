import * as THREE from "three";

export const createSnow = (particles: THREE.Points[], world: THREE.Group) => {
  particles.forEach((p) => p.parent?.remove(p));
  particles.length = 0;

  const snowCount = 80;

  const positions = new Float32Array(snowCount * 3);
  const velocities = new Float32Array(snowCount);

  for (let i = 0; i < snowCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = Math.random() * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

    velocities[i] = 0.01 + Math.random() * 0.03; // ❄️ 눈은 느리게
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 1));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    opacity: 0.8,
  });

  const snow = new THREE.Points(geometry, material);
  world.add(snow);
  particles.push(snow);
};
