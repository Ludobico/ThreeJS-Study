import * as THREE from "../../node_modules/three/build/three.module.js";
import * as dat from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//debug
const gui = new dat.GUI();

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
document.body.appendChild(renderer.domElement);

//mesh
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const material = new THREE.PointsMaterial({ transparent: true, size: 0.005 });
const cube = new THREE.Points(geometry, material);
scene.add(cube);

//gui for mesh
gui.add(material, "size").min(0.001).max(0.02);

//particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;
const posArray = new Float32Array(particlesCnt * 3);
// xyz, xyz, xyz, xyz
for (let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = Math.random();
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

//gui for particles

//light
const color = 0xffffff;
const indensity = 0.1;
const PL = new THREE.PointLight(color, indensity);
PL.position.set(2, 3, 4);

//rendering
function render() {
  renderer.render(scene, camera);
  cube.rotation.y += 0.005;
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
