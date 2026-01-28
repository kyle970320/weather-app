import * as THREE from "three";

export const createRain = (paricles: THREE.Points[], world: THREE.Group) => {
  paricles.forEach((p) => p.parent?.remove(p));
  paricles.length = 0;

  const rainCount = 200;

  const positions = new Float32Array(rainCount * 3);
  const velocities = new Float32Array(rainCount);

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // x
    positions[i * 3 + 1] = Math.random() * 15; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

    velocities[i] = 0.08 + Math.random() * 0.12; // 비마다 속도 다르게
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 1));

  const material = new THREE.PointsMaterial({
    color: 0xfafdff,
    size: 0.5,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });

  const rain = new THREE.Points(geometry, material);
  world.add(rain);
  paricles.push(rain);
};
