import * as THREE from "three";

// 비니 모자 추가
export const addBeanie = (head: THREE.Mesh) => {
  const beanieGroup = new THREE.Group();

  // 비니 본체
  const beanieGeo = new THREE.SphereGeometry(
    0.58,
    16,
    16,
    0,
    Math.PI * 2,
    0,
    Math.PI / 1.3,
  );
  const beanieMat = new THREE.MeshStandardMaterial({
    color: 0xff6b35,
    roughness: 0.9,
    metalness: 0.0,
  });

  const beanie = new THREE.Mesh(beanieGeo, beanieMat);
  beanie.position.set(0, 0.6, 0);
  beanie.castShadow = true;
  beanie.receiveShadow = true;
  beanieGroup.add(beanie);

  // 비니 접힌 부분 (테두리)
  const foldGeo = new THREE.TorusGeometry(0.58, 0.08, 8, 16);
  const foldMat = new THREE.MeshStandardMaterial({
    color: 0xe85d24,
    roughness: 0.9,
  });

  const fold = new THREE.Mesh(foldGeo, foldMat);
  fold.position.set(0, 0.6, 0);
  fold.rotation.x = Math.PI / 2;
  fold.castShadow = true;
  beanieGroup.add(fold);

  // 폼폼 (꼭대기)
  const pompomGeo = new THREE.SphereGeometry(0.12, 8, 8);
  const pompomMat = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    roughness: 1.0,
  });

  const pompom = new THREE.Mesh(pompomGeo, pompomMat);
  pompom.position.set(0, 1.15, 0);
  pompom.castShadow = true;
  beanieGroup.add(pompom);

  head.add(beanieGroup);
  return beanieGroup;
};

// 헤드폰 추가 🎧
export const addHeadphones = (head: THREE.Mesh) => {
  const headphonesGroup = new THREE.Group();

  // 헤드밴드
  const bandGeo = new THREE.TorusGeometry(0.9, 0.05, 8, 24, Math.PI);
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0,
    metalness: 0.1,
  });

  const band = new THREE.Mesh(bandGeo, bandMat);
  band.position.set(0, 0, 0);
  band.castShadow = true;
  headphonesGroup.add(band);

  // 이어컵(토러스 기반)
  const cupGeo = new THREE.TorusGeometry(0.12, 0.22, 16, 100);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0,
    metalness: 0,
  });

  const leftCup = new THREE.Mesh(cupGeo, cupMat);
  leftCup.position.set(-0.9, 0, 0);
  leftCup.rotation.y = Math.PI / 2;
  leftCup.castShadow = true;
  headphonesGroup.add(leftCup);

  const rightCup = new THREE.Mesh(cupGeo, cupMat);
  rightCup.position.set(0.9, 0, 0);
  rightCup.rotation.y = Math.PI / 2;
  rightCup.castShadow = true;
  headphonesGroup.add(rightCup);

  head.add(headphonesGroup);
  return headphonesGroup;
};

// 특정 캐릭터 인덱스에 맞는 악세서리 배정
export const setupAccessory = (
  accessoryType: "beanie" | "headphones",
  head: THREE.Mesh,
) => {
  switch (accessoryType) {
    case "beanie":
      return addBeanie(head);
    case "headphones":
      return addHeadphones(head);
    default:
      return null;
  }
};
