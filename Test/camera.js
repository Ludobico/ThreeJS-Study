import * as THREE from "../node_modules/three/build/three.module.js";

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
  //안티엘리어싱
  antialias: true,
  //아무것도 없는 공간은 투명하게
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//매쉬01
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 0;
scene.add(cube);

//빛
const PL = new THREE.PointLight(0xffffff, 1);
PL.position.set(0, 2, 12);
scene.add(PL);

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
