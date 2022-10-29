import * as THREE from "../node_modules/three/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfffff1);

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
  //   alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//매쉬01
const material01 = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
  metalness: 0.9,
  roughness: 0.2,
  //   wireframe: true,
});
const geometry01 = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const obj00 = new THREE.Mesh(geometry01, material01);
obj00.position.x = -2;
scene.add(obj00);

//매쉬02
const geometry02 = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const material02 = new THREE.MeshDepthMaterial({
  color: 0xff7f00,
});
const obj01 = new THREE.Mesh(geometry02, material02);
obj01.position.x = -1;
scene.add(obj01);

//매쉬03
const geometry03 = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const material03 = new THREE.MeshLambertMaterial({
  color: 0xff7f00,
});
const obj02 = new THREE.Mesh(geometry03, material03);
obj02.position.x = 0;
scene.add(obj02);

//매쉬04
const geometry04 = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const material04 = new THREE.MeshPhongMaterial({
  color: 0xff7f00,
  shininess: 90,
  specular: 0x004fff,
});
const obj03 = new THREE.Mesh(geometry04, material04);
obj03.position.x = 1;
scene.add(obj03);

//매쉬05
const geometry05 = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const material05 = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
  metalness: 0.5,
  roughness: 0.4,
  wireframe: true,
});
const obj04 = new THREE.Mesh(geometry05, material05);
obj04.position.x = 2;
scene.add(obj04);

//빛
const pointlight = new THREE.PointLight(0xffffff, 1);
pointlight.position.set(0, 2, 12);
scene.add(pointlight);

function render(time) {
  time *= 0.0005;
  renderer.render(scene, camera);
  obj00.rotation.y += 0.005;
  obj01.rotation.y += 0.01;
  obj02.rotation.y += 0.015;
  obj03.rotation.y += 0.02;
  obj04.rotation.y += 0.025;
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
