import * as THREE from "../../../node_modules/three/build/three.module.js";

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//camera
const camera = new THREE.PerspectiveCamera(
  70,
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

//텍스쳐로더
const loader = new THREE.TextureLoader();

//mesh
const geometry = new THREE.PlaneGeometry(10, 5, 11, 5);
//14, 8, 15, 9
const material = new THREE.MeshBasicMaterial({
  // color: 0xff0000,
  map: loader.load("./3d_background_img.jpg"),
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);

    const anim1 = 0.25 * Math.sin(x + time * 0.7);
    const anim2 = 0.35 * Math.sin(x * 1 + time * 0.7);
    const anim3 = 0.1 * Math.sin(y * 15 + time * 0.7);

    geometry.attributes.position.setZ(i, anim1 + anim2);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }
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
