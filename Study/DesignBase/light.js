import * as THREE from "../node_modules/three/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//카메라
const fov = 75; //카메라 각도(시야각)
const aspect = window.innerWidth / window.innerHeight; //종횡비(가로 세로 비율)
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 1);

//렌더러
const renderer = new THREE.WebGLRenderer({
  //안티엘리어싱
  antialias: true,
  //아무것도 없는 공간은 투명하게
  //   alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//매쉬01
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const geometry = new THREE.SphereGeometry(0.5, 32, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
  metalness: 0.65,
  roughness: 0.3,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 0;
scene.add(cube);

//빛
// const AL = new THREE.AmbientLight(0xffffff, 1);
// scene.add(AL);

// const DL = new THREE.DirectionalLight(0xffffff, 1);
// DL.position.set(1, 1, 1); //빛의 방향(1,1,1은 우측 상단)
// const DLHelper = new THREE.DirectionalLightHelper(DL, 0.5, 0x0000ff);
// scene.add(DLHelper); //빛의 방향 알려줌(해당빛, 크기, 색갈)
// scene.add(DL);

// const HL = new THREE.HemisphereLight(0x00ffff, 0xff0000, 1);
// scene.add(HL); //첫번쨰는 skycolor, 두번째는 groundcolor, indensity

// const PL = new THREE.PointLight(0xffffff, 1);
// const PLHelper = new THREE.PointLightHelper(PL, 1, 0x0000ff);
// scene.add(PL);
// scene.add(PLHelper);
// PL.position.set(0.5, 0.5, 0.5);
// const PL1 = new THREE.PointLight(0xffffff, 1);
// const PLHelper1 = new THREE.PointLightHelper(PL1, 1, 0x0000ff);
// scene.add(PL1);
// scene.add(PLHelper1);
// PL1.position.set(-1, 0.5, 0.5);

// const RAL = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
// //color, width, height, indensity
// RAL.position.set(0.5, 0.5, 1);
// scene.add(RAL);

const SL = new THREE.SpotLight(0xffffff, 1);
scene.add(SL);
SL.position.set(-1, 1, 1);

function render(time) {
  time *= 0.0005;
  renderer.render(scene, camera);

  cube.rotation.y = time;

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
