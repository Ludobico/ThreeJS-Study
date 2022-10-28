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
camera.position.z = 3;
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
const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material01 = new THREE.MeshStandardMaterial({
  color: 0x999999,
});
const cube = new THREE.Mesh(geometry01, material01);
cube.position.x = -1;
scene.add(cube);

//매쉬02
const geometry02 = new THREE.ConeGeometry(0.4, 0.6, 6);
const material02 = new THREE.MeshStandardMaterial({
  color: 0x999999,
});
const obj01 = new THREE.Mesh(geometry02, material02);
obj01.position.x = 0;
scene.add(obj01);

//매쉬03
const geometry03 = new THREE.IcosahedronGeometry(0.5, 0);
const material03 = new THREE.MeshStandardMaterial({
  color: 0x999999,
});
const obj02 = new THREE.Mesh(geometry03, material03);
obj02.position.x = 1;
scene.add(obj02);

function render(time) {
  time *= 0.0005;
  renderer.render(scene, camera);

  cube.rotation.y = time;

  obj01.rotation.y = time;

  obj02.rotation.y = time;

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
