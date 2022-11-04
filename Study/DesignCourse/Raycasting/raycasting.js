import * as THREE from "../../../node_modules/three/build/three.module.js";
import { OrbitControls } from "../../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import * as dat from "../../../node_modules/dat.gui/build/dat.gui.module.js";
import gsap from "../../../node_modules/gsap/gsap-core.js";

//debug
const gui = new dat.GUI();

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//texture loader
const textureLoader = new THREE.TextureLoader();

//mesh
const geometry = new THREE.PlaneBufferGeometry(3, 1.3); //width, height, widthsegment, heightsegment
for (let i = 0; i < 4; i++) {
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`./images/${i}.jpg`),
  });

  const img = new THREE.Mesh(geometry, material);
  img.position.set(1.5 + Math.random(), i * -2.5);
  scene.add(img);
}

let objs = [];
scene.traverse((object) => {
  if (object.isMesh) {
    objs.push(object);
  }
});

//light
const PL = new THREE.PointLight(0xffffff, 1);
PL.position.set(2, 3, 4);
scene.add(PL);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

//camera gui
gui.add(camera.position, "y").min(-10).max(5);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//mouse control
window.addEventListener("wheel", onMouseWheel);
let y = 0;
let position = 0;

function onMouseWheel(e) {
  y = e.deltaY * 0.0017; //deltaY는 스크롤 시 50씩 증/감소 하므로 최소화해야됨
}

const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

//animate
const raycaster = new THREE.Raycaster();

//CLOCK
const clock = new THREE.Clock();

//rendering
function render() {
  const elapsedTime = clock.getElapsedTime();
  //smooth scroll
  position -= y; //-면 일반스크롤, +면 반전스크롤
  y *= 0.9; //스크롤 슬라이드 효과 1을 넘기면 무한 스크롤
  camera.position.y = position;

  // raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(objs); //매쉬에 마우스 갖다대면 변함

  for (const intersect of intersects) {
    gsap.to(intersect.object.scale, { x: 1.4, y: 1.4 });
    gsap.to(intersect.object.rotation, { y: -0.5 });
    gsap.to(intersect.object.position, { z: -0.9 });
  }

  for (const object of objs) {
    if (!intersects.find((intersect) => intersect.object === object)) {
      gsap.to(object.scale, { x: 1, y: 1 });
      gsap.to(object.rotation, { y: 0 });
      gsap.to(object.position, { z: 0 });
    }
  }

  renderer.render(scene, camera);
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
