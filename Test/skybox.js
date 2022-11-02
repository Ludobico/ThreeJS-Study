import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
//https://opengameart.org/content/skiingpenguins-skybox-pack

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//카메라
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 100);
camera.lookAt(0, 0, 0);

//렌더러
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// orbitControl 카메라 세팅 이후에 해야됨
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 20; //마우스 휠로 카메라 거리 조작시 최소 값
controls.maxDistance = 800;
controls.update();
//텍스쳐
const skyMaterialArray = [];
const texture_rt = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_rt.jpg"
);
const texture_bk = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_bk.jpg"
);
const texture_dn = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_dn.jpg"
);
const texture_ft = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_ft.jpg"
);
const texture_lf = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_lf.jpg"
);
const texture_up = new THREE.TextureLoader().load(
  "../textures/penguins_skybox_pack/penguins(17)/humble_up.jpg"
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_ft,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_bk,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_up,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_dn,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_rt,
  })
);
skyMaterialArray.push(
  new THREE.MeshStandardMaterial({
    map: texture_lf,
  })
);
for (let i = 0; i < 6; i++) {
  skyMaterialArray[i].side = THREE.BackSide;
}

// 오브젝트
const skygeometry = new THREE.BoxGeometry(400, 400, 400);
const skymesh = new THREE.Mesh(skygeometry, skyMaterialArray);
scene.add(skymesh);

//빛
const AL = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(AL);

//렌더링
function render() {
  renderer.render(scene, camera);
  controls.update();
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
