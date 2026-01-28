import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  createCharacterCommon,
  createCharacterCold,
} from "@/entity/character/model/character";
import { setupLight } from "@/entity/character/model";
import { HAIR_COLORS, SKIN_COLORS } from "@/entity/character";
import { useGetParticle } from "./useGetParticle";

interface Props {
  ptyType?: string;
  currentTemperature?: string;
  width?: number;
  height?: number;
}
export const useGetCharacter = ({
  ptyType,
  currentTemperature,
  width = 160,
  height = 160,
}: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<THREE.Points[]>([]);
  const canvasWidth = width;
  const canvasHeight = height;
  const {
    createRain,
    createSnow,
    createMusicNotes,
    updateRain,
    updateSnow,
    updateMusicNotes,
  } = useGetParticle();
  const isCold = useMemo(() => {
    return Number(currentTemperature) < 0;
  }, [currentTemperature]);

  const createCharacter = useCallback(
    (color: number, hairColor: number, x: number, y: number, z = 0) => {
      if (isCold) {
        return createCharacterCold(color, hairColor, x, y, z);
      } else {
        return createCharacterCommon(color, hairColor, x, y, z);
      }
    },
    [isCold],
  );

  const createBgParticles = useCallback(
    (world: THREE.Group) => {
      if (ptyType === "1" || ptyType === "4") {
        return createSnow(particlesRef.current, world);
      } else if (ptyType === "2" || ptyType === "3") {
        return createRain(particlesRef.current, world);
      } else {
        return createMusicNotes(particlesRef.current, world);
      }
    },
    [ptyType, createRain, createSnow, createMusicNotes],
  );

  const updateBgParticles = useCallback(
    (deltaTime: number) => {
      if (ptyType === "1" || ptyType === "4") {
        return updateSnow(particlesRef.current, deltaTime);
      } else if (ptyType === "2" || ptyType === "3") {
        return updateRain(particlesRef.current, deltaTime);
      } else {
        return updateMusicNotes(particlesRef.current, deltaTime);
      }
    },
    [ptyType, updateRain, updateSnow, updateMusicNotes],
  );

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();

    const world = new THREE.Group();
    world.position.y = 1.1;
    scene.add(world);

    const camera = new THREE.PerspectiveCamera(
      10,
      canvasWidth / canvasHeight,
      0.5,
      100,
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b1220, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    setupLight(world);

    const character = createCharacter(SKIN_COLORS, HAIR_COLORS, 0, -2, 0);
    world.add(character);

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const deltaTime =
        now - (animate as unknown as { lastTime: number }).lastTime || 16;
      (animate as unknown as { lastTime: number }).lastTime = now;
      updateBgParticles?.(deltaTime);

      /** 👀 Blink */
      character.userData.blinkTimer += deltaTime;
      if (character.userData.blinkTimer >= character.userData.nextBlinkTime) {
        character.userData.isBlinking = true;
        character.userData.blinkProgress = 0;
        character.userData.blinkTimer = 0;
        character.userData.nextBlinkTime = 6000 + Math.random() * 5000;
      }

      if (character.userData.isBlinking) {
        character.userData.blinkProgress += deltaTime * 0.01;
        const blinkDuration = 850;
        let phase = (character.userData.blinkProgress * 1000) / blinkDuration;

        if (phase > 2) {
          character.userData.isBlinking = false;
          phase = 0;
        }

        const eyelidScale = phase <= 1 ? phase : 2 - phase;
        character.userData.leftEyelid.scale.y = 0.01 + eyelidScale * 1.19;
        character.userData.rightEyelid.scale.y = 0.01 + eyelidScale * 1.19;
      }

      const coldShake = isCold ? 0.08 : 0.01;
      character.userData.shakeTime += deltaTime * coldShake;
      const shake =
        Math.sin(character.userData.shakeTime) *
        character.userData.shakeIntensity;

      character.position.x = shake * 0.6;
      character.position.y = -2 + Math.abs(shake) * 0.4;
      character.rotation.z = shake * 0.15;
      character.rotation.x = shake * 0.05;

      renderer.render(scene, camera);
    }

    createBgParticles(world);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      renderer.forceContextLoss();
      currentMount.removeChild(renderer.domElement);
    };
  }, [isCold, createCharacter, createBgParticles, updateBgParticles]);

  return {
    mountRef,
  };
};
