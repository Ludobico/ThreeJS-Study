# 선 그리기(Drawing lines)

와이어프레임 `Mesh`를 사용하지 않고 선이나 원을 그려봅시다. 먼저 `renderer`,`scene`,`camera`를 설정합니다.

사용할 코드는 다음과 같습니다.

```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.ineerHeight);
document.body.appendChild(renderer, domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
```

다음으로는 재질을 정의해야 합니다. 선을 그리기 위해서는 `LineBasicMaterial`이나 `LineDashedMaterial`을 사용하면 됩니다.

```js
// 파란선
const material = new.THREE.LineBasicMaterial( { color: 0x0000ff})
```

그 다음에는 꼭짓점에 대한 기하학을 정의해야 합니다.

```js
const points = [];

points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
```

선은 연속된 꼭짓점 쌍 사이에 그려지고 첫 번째와 마지막 꼭짓점에는 그려지지 않습니다. (선은 닫혀있지 않습니다.)

이제 두 선을 그리기 위한 점과 재질이 있으니, 합쳐서 선을 만들 수 있습니다.

```js
const line = new THREE.Line(geometry, material);
```

이제 남은 것은 scene에 추가하고 `render`를 하는 것입니다.

```js
scene.add(line);
renderer.render(scene, camera);
```

위로 향하고 있는 두 개의 파란 선으로 된 화살표를 확인할 수 있습니다.
