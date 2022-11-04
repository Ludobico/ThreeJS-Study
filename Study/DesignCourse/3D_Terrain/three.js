import * as THREE from "../../../node_modules/three/build/three.module.js";
import * as dat from "../../../node_modules/dat.gui/build/dat.gui.module.js";

//scene
const scene = new THREE.Scene();

//debug
const gui = new dat.GUI();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//texture loader
const Loader = new THREE.TextureLoader();
const texture = Loader.load("./texture/mountain.jpg");
const height = Loader.load("./texture/height.jpg");
const alpha = Loader.load("./texture/alpha.jpg");

//mesh
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "gray",
  map: texture,
  displacementMap: height,
  displacementScale: 0.7,
  alphaMap: alpha,
  transparent: true,
  depthTest: false,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = 181;
//mesh gui
gui.add(plane.rotation, "x").min(0).max(600);

//light
const PL = new THREE.PointLight(0x1d81a8, 3);
PL.position.set(-1.5, 2.5, 0.9);
scene.add(PL);

const col = { color: 0x00ff00 };

//Light gui
gui.add(PL.position, "x").name("PointLight X");
gui.add(PL.position, "y").name("PointLight y");
gui.add(PL.position, "z").name("PointLight z");
gui
  .addColor(col, "color")
  .onChange(() => {
    PL.color.set(col.color);
  })
  .name("PointLight Color");

//animate
window.addEventListener("mousemove", animateTerrain);
let mouseY = 0;

function animateTerrain(e) {
  mouseY = e.clientY;
}

//clock
const clock = new THREE.Clock();
//render
function animate() {
  const elapsedTime = clock.getElapsedTime();
  plane.rotation.z = 0.2 * elapsedTime;
  plane.material.displacementScale = 0.3 + mouseY * 0.0006;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

//반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
