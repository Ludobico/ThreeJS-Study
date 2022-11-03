import * as THREE from "../node_modules/three/build/three.module.js";
// import orbitControl from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

//장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

//렌더러
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

document.body.appendChild(renderer.domElement);

//빛
const PL = new THREE.PointLight(0xffffff, 1);
PL.position.set(0, 2, 12);
scene.add(PL);

//https://3dtextures.me/
// 텍스쳐 basecolor 추가
const textureLoader = new THREE.TextureLoader();
const abstractBaseColor = textureLoader.load(
  "../textures/Abstract_011_SD/Abstract_011_basecolor.jpg"
);
const metalBaseColor = textureLoader.load(
  "../textures/Metal_006_SD/Metal_006_basecolor.jpg"
);
const plasticBaseColor = textureLoader.load(
  "../textures/Plastic_001_SD/Plastic_001_COLOR.jpg"
);
const plasticMeshBaseColor = textureLoader.load(
  "../textures/Plastic_Mesh_001_SD/Plastic_Mesh_001_basecolor.jpg"
);
const stoneBaseColor = textureLoader.load(
  "../textures/Stylized_Stone_Floor_005_SD/Stylized_Stone_Floor_005_basecolor.jpg"
);

//텍스쳐 normal 추가
const abstractNormal = textureLoader.load(
  "../textures/Abstract_011_SD/Abstract_011_normal.jpg"
);
const metalNormal = textureLoader.load(
  "../textures/Metal_006_SD/Metal_006_normal.jpg"
);
const plasticMeshNormal = textureLoader.load(
  "../textures/Plastic_Mesh_001_SD/Plastic_Mesh_001_normal.jpg"
);
const stoneNormal = textureLoader.load(
  "../textures/Stylized_Stone_Floor_005_SD/Stylized_Stone_Floor_005_normal.jpg"
);

//텍스쳐 height 추가
const abstractHeight = textureLoader.load(
  "../textures/Abstract_011_SD/Abstract_011_height.png"
);
const metalHeight = textureLoader.load(
  "../textures/Metal_006_SD/Metal_006_height.png"
);
const plasticMeshHeight = textureLoader.load(
  "../textures/Plastic_Mesh_001_SD/Plastic_Mesh_001_height.png"
);
const stoneHeight = textureLoader.load(
  "../textures/Stylized_Stone_Floor_005_SD/Stylized_Stone_Floor_005_height.png"
);

//텍스쳐 roughness 추가
const abstractRoughness = textureLoader.load(
  "../textures/Abstract_011_SD/Abstract_011_roughness.jpg"
);
const metalRoughness = textureLoader.load(
  "../textures/Metal_006_SD/Metal_006_roughness.jpg"
);
const plasticRoughness = textureLoader.load(
  "../textures/Plastic_001_SD/Plastic_001_ROUGH.jpg"
);
const plasticMeshRoughness = textureLoader.load(
  "../textures/Plastic_Mesh_001_SD/Plastic_Mesh_001_roughness.jpg"
);
const stoneRoughness = textureLoader.load(
  "../textures/Stylized_Stone_Floor_005_SD/Stylized_Stone_Floor_005_roughness.jpg"
);

//텍스쳐 AmbientOcclusion 추가
const abstractAO = textureLoader.load(
  "../textures/Abstract_011_SD/Abstract_011_ambientOcclusion.jpg"
);
const plasticMeshAO = textureLoader.load(
  "../textures/Plastic_Mesh_001_SD/Plastic_Mesh_001_ambientOcclusion.jpg"
);

//도형1
const geometry = new THREE.SphereGeometry(0.3, 32, 16);
const material01 = new THREE.MeshStandardMaterial({
  map: abstractBaseColor,
  normalMap: abstractNormal,
  displacementMap: abstractHeight, //스캐일이 커져서 크게 나옴
  displacementScale: 0.01,
  roughnessMap: abstractRoughness,
  aoMap: abstractAO,
  metalness: 0.8,
  roughness: 1,
  castShadow: true,
});
const obj01 = new THREE.Mesh(geometry, material01);
obj01.position.x = -2;
scene.add(obj01);

//도형2
const material02 = new THREE.MeshStandardMaterial({
  map: metalBaseColor,
  normalMap: metalNormal,
  displacementMap: metalHeight,
  displacementScale: 0.2,
  roughnessMap: metalRoughness,
  metalness: 0.7,
  roughness: 1,
});
const obj02 = new THREE.Mesh(geometry, material02);
obj02.position.x = -1;
scene.add(obj02);

//도형3
const material03 = new THREE.MeshStandardMaterial({
  map: plasticBaseColor,
  roughnessMap: plasticRoughness,
  metalness: 0.7,
  roughness: 1,
  wireframe: true,
});
const obj03 = new THREE.Mesh(geometry, material03);
obj03.position.x = 0;
scene.add(obj03);

//도형4
const material04 = new THREE.MeshStandardMaterial({
  //   map: plasticMeshBaseColor,
  normalMap: plasticMeshNormal,
  displacementMap: plasticMeshHeight,
  displacementScale: 0.01,
  roughnessMap: plasticMeshRoughness,
  aoMap: plasticMeshAO,
  metalness: 0.4,
  roughness: 0.5,
});
const obj04 = new THREE.Mesh(geometry, material04);
obj04.position.x = 1;
scene.add(obj04);

//도형5
const material05 = new THREE.MeshStandardMaterial({
  map: stoneBaseColor,
  normalMap: stoneNormal,
  displacementMap: stoneHeight,
  displacementScale: 0.2,
  roughnessMap: stoneRoughness,
});
const obj05 = new THREE.Mesh(geometry, material05);
obj05.position.x = 2;
scene.add(obj05);

function render(time) {
  time *= 0.0005;
  renderer.render(scene, camera);
  obj01.rotation.y += 0.01;
  obj02.rotation.y += 0.01;
  obj03.rotation.y += 0.001;
  obj04.rotation.y += 0.01;
  obj05.rotation.y += 0.01;
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
