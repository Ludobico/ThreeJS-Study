import {
  ACESFilmicToneMapping,
  sRGBEncoding,
} from "../../../node_modules/three/build/three.module.js";
import * as THREE from "../../../node_modules/three/build/three.module.js";
import { RGBELoader } from "../../../node_modules/three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { BoxGeometry } from "three";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffeecc);

//camera setting
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 20);
//renderer
const renderer = new THREE.WebGLRenderer({
  //안티엘리어싱
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputEncoding = sRGBEncoding;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

let envmap;
let pmrem = new THREE.PMREMGenerator(renderer);
let envmapTexture = await new RGBELoader()
  .setDataType(THREE.FloatType)
  .loadAsync("asset/studio_small_03_4k.hdr");

envmap = pmrem.fromEquirectangular(envmapTexture).texture;

//mesh
const geometry = new THREE.SphereGeometry(5, 10, 10);
const material = new THREE.MeshStandardMaterial({
  envMap: envmap,
  roughness: 0,
  metalness: 1,
});
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

//orbitControl
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;

async function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphereMesh.rotation.y += 0.01;
  controls.update();
}
animate();

// 반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

let hexagonGeometries = new THREE.BoxGeometry(0, 0, 0);

function hexGeometry(height, position) {
  let geo = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);

  return geo;
}
