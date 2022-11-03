import * as THREE from "../../node_modules/three/build/three.module.js";
import * as dat from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//debug
// const gui = new dat.GUI();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 2);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21282a"), 1);
document.body.appendChild(renderer.domElement);

//texture
const textureLoader = new THREE.TextureLoader();
const star = textureLoader.load("../../textures/star/star1.png");

//mesh
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const material = new THREE.PointsMaterial({ transparent: true, size: 0.005 });
const cube = new THREE.Points(geometry, material);
scene.add(cube);

//gui for mesh
// gui.add(material, "size").min(0.001).max(0.02);

//particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 1500;
const posArray = new Float32Array(particlesCnt * 3);
// xyz, xyz, xyz, xyz
for (let i = 0; i < particlesCnt * 3; i++) {
  // posArray[i] = Math.random();
  // posArray[i] = Math.random() - 0.5; //random 뒤의 값으로 위치조정
  // posArray[i] = (Math.random() - 0.5) * 5; // 곱셈으로 버퍼의 크기(확대율) 조절
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5); //확대율 및 밀도 조절
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  map: star,
  transparent: true,
  color: "white",
  blending: THREE.AdditiveBlending, //블렌딩 속성을 변경해서 채도효과를 냄
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

//gui for particles

//light
const color = 0xffffff;
const indensity = 3;
const PL = new THREE.PointLight(color, indensity);
PL.position.set(1, 1, 0.5);
scene.add(PL);

//mouse
document.addEventListener("mousemove", animateParticles);
let mouseX = 0;
let mouseY = 0;
function animateParticles(e) {
  mouseY = e.clientY;
  mouseX = e.clientX;
}
//CLOCK
const clock = new THREE.Clock();
//rendering
function render() {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  cube.rotation.y += 0.007;
  // particlesMesh.rotation.y = mouseY / window.innerHeight - 0.5;
  // particlesMesh.rotation.x = mouseX / window.innerWidth - 0.5;

  particlesMesh.rotation.y = -0.01 * elapsedTime;
  if (mouseX > 0) {
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.000008);
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.000008);
  }
  requestAnimationFrame(render);
}
render();

//반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
