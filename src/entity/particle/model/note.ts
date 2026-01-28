import * as THREE from "three";

export const createMusicNotes = (
  particles: THREE.Points[],
  world: THREE.Group,
) => {
  particles.forEach((p) => p.parent?.remove(p));
  particles.length = 0;

  const count = 10;

  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);
  const sway = new Float32Array(count); // 좌우 흔들림용

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = Math.random() * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

    velocities[i] = 0.02 + Math.random() * 0.03;
    sway[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 1));
  geometry.setAttribute("sway", new THREE.BufferAttribute(sway, 1));

  const loader = new THREE.TextureLoader();

  const texture = loader.load("/note.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.PointsMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.1,
    size: 12,
    depthWrite: false,
  });

  const notes = new THREE.Points(geometry, material);
  notes.frustumCulled = false;

  world.add(notes);
  particles.push(notes);
};
