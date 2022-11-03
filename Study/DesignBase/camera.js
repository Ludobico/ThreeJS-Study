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
camera.lookAt(new THREE.Vector3(0, 0, 0));

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

//바닥 추가
const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = 1 * Math.PI;
plane.rotation.y = 1;
scene.add(plane);

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
