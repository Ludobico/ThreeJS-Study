# Scene 만들기
three.js 로 무언가를 표현하려면 scene,camera 그리고 renderer 가 필요합니다. 이를 통해 카메라로 장면을 구현할 수 있습니다.

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

