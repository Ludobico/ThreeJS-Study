import * as THREE from "../../../node_modules/three/build/three.module.js";
import { FontLoader } from "../../../node_modules/three/examples/jsm/loaders/FontLoader.js";
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

//renderer
const renderer = new THREE.WebGLRenderer({
  //안티엘리어싱
  antialias: true,
  //아무것도 없는 공간은 투명하게
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//FontLoader & mesh
const fontLoader = new FontLoader();
fontLoader.load("./Font/BM DoHyeon_Regular.json", (font) => {
  const geometry = new THREE.TextGeometry("FONT_TEXT", {
    font: font,
    size: 1,
    height: 0,
    curveSegments: 12,
  });
  geometry.computeBoundingBox();
  let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  geometry.translate(xMid, 0, 0);

  let material = new THREE.MeshBasicMaterial();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 반응형 처리
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);
