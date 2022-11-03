import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 1);

//렌더러
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// orbitControl 카메라 세팅 이후에 해야됨
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 2; //마우스 휠로 카메라 거리 조작시 최소 값
controls.maxDistance = 6;
// controls.maxPolarAngle = 1; //아랫 각도 제어
controls.maxPolarAngle = Math.PI / 2; //절반
// controls.minPolarAngle = 1; //윗 각도 제어
controls.update();

// 오브젝트
const meterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  roughness: 0.4,
  metalness: 0.7,
  //   wireframe: true,
});
const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const obj = new THREE.Mesh(geometry, meterial);
obj.castShadow = true;
obj.position.set(0, 0.2, 0);
scene.add(obj);

//오브젝트2
const meterial1 = new THREE.MeshPhysicalMaterial({
  color: 0x00ffff,
  roughness: 0.3,
  metalness: 1,
});
const geometry1 = new THREE.IcosahedronGeometry(0.5, 0);
const obj1 = new THREE.Mesh(geometry1, meterial1);
obj1.castShadow = true;
obj1.position.set(0.5, 1, 0);
scene.add(obj1);

//바닥
const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
const planematerial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planematerial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.2;
plane.receiveShadow = true;
scene.add(plane);

//빛
const PL = new THREE.PointLight(0xcc33cc, 1, 0, 2);
PL.position.set(-0.8, 0.3, -0.5);
PL.castShadow = true;
PL.shadow.radius = 4; //그림자 블러 효과
// PL.shadow.mapSize.width = 2048;
// PL.shadow.mapSize.height = 2048;
// const plhelper = new THREE.PointLightHelper(PL, 1, 0x0000ff);
scene.add(PL);
// scene.add(plhelper);

//빛2
const SP = new THREE.SpotLight(0x33ffff, 0.6);
SP.position.set(2, 0, 0);
SP.shadow.radius = 4;
scene.add(SP);

//렌더링
function render() {
  renderer.render(scene, camera);
  // obj.rotation.y += 0.01;
  // obj1.rotation.y += 0.005;
  controls.update();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

//반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
