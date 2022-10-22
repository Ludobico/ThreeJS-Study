# 오브젝트를 업데이트하는 방법(How to update things)

모든 오브젝트들은 기본적으로 자동으로 장면에 추가됐을 때 자신들의 행렬구조를 업데이트합니다.

```js
const object = new THREE.Object3D();
scene.add(object);
```

혹은 다른 오브젝트의 자식으로 장면에 추가될 때도 마찬가지입니다.

```js
const object1 = new THREE.Object3D();
const object2 = new THREE.Object3D();

object1.add(object2);
scene.add(object1);
// obj1과 obj2는 자동으로 자신들의 행렬구조를 업데이트 합니다
```

하지만 오브젝트가 고정되어야 한다면, 이 설정을 풀고 수동으로 행렬구조를 갱신 할 수 있습니다.

```js
object.matrixAutoUpdate = false;
object.updateMatrix();
```

## BufferGeometry

BufferGeometry는 `buffers`에 다양한 정보(**꼭짓점 위치, 면 순서, 법선, 컬러, UV, 모든 커스텀 속성들**)를 저장합니다. 이는 `array` 타입이라는 의미입니다. 이는 기본 Geometries보다 빠르게 작동하지만, 그 대신 작업하기가 더 어렵습니다.

BufferGeometries를 업데이트 하는 것과 관련해서, buffers의 크기를 조절할 수 없다는 것을 이해하는 것이 가장 중요합니다. (작업이 아주 어렵기 때문에, 새 geometry를 만드는 수준입니다.) 그 대신에 buffers의 내용을 변경할 수 있습니다.

이는 곧 만약 BufferGeometry의 속성이 증가할 것이라고 예측이 된다면, 예를 들어 꼭짓점의 갯수라면, 만들어질 수 있는 새로운 꼭짓점들을 담을 수 있는 충분한 `buffer`를 미리 준비해 놓아야 합니다. 물론 이는 당신이 사용할 BufferGeometry의 상한치가 있을 것이라는 뜻이기도 합니다 - 효율적으로 무한대로 확장하는 BufferGeometry를 만드는 방법은 없습니다.

**렌더링 시점**에 확장되는 선을 예로 들어보겠습니다. buffer에는 500 개의 꼭짓점을 할당하겠지만 처음에는 `BufferGeometry.drawRange`를 이용해 두 개만 그릴 것입니다.

```js
const MAX_POINTS = 500;

//geometry
const geometry = new THREE.BufferGeometry();

// attributes
const positions = new Float32Array(MAX_POINTS * 3); //3

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// draw range
const drawCount = 2;
geometry.setDrawRange(0, drawCount);

//material
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

//line
const line = new THREE.Line(geometry, material);
scene.add(line);
```

그 다음, 아래와 같은 패턴으로 무작위로 선에 점을 생성해 줄 것입니다.

```js

let x,y,z,index;
x = y = z = index = 0;

for (let i = 0, l = MAX_POINTS; i < 1; i ++){

    positions{ index ++ } = x;
    positions{ index ++ } = y;
    positions{ index ++ } = z;

    x += ( Math.random() - 0.5 ) * 30;
    y += ( Math.random() - 0.5 ) * 30;
    z += ( Math.random() - 0.5 ) * 30;
}
```

첫 렌더링 이후에 점의 갯수를 변경하고 싶다면, 다음과 같이 실행하세요

```js
line.geometry.setDrawRange(0, newValue);
```

첫 렌더링 이후에 `position` 데이터 수치를 변경하고 싶다면, needsUpdate 플래그를 다음과 같이 설정해야 합니다.

```js
line.geometry.attributes.position.needsUpdate = true;
// 첫 렌더링된 후에 실행해야됨
```

첫 렌더링 이후에 `position` 데이터 수치를 변경한다면, `bounding volumes`를 재계산해서 다른 엔진의 절두체 컬링 혹은 헬퍼같은 특성들이 적절히 작동하도록 해야합니다.

```js
line.geometry.computeBoundingBox();
line.geometry.computeBoundingSphere();
```

## 재질(Materials)

모든 **uniforms** 값들은 자유롭게 변경이 가능합니다. (예를 들면 `colors,textures,opacity,etc`), 값들은 `shader`에 매 프레임 전송됩니다.

`GLstate`와 관련된 파라미터들 또한 언제나 변경 가능합니다.(`depthTest, blending, polygonOffset`등)

아래 속성들은 런타임에서 쉽게 변경할 수 없습니다. (적어도 재질이 한 번 렌더링 된 이후)

- uniforms의 갯수와 타입
- 아래 항목들의 사용 혹은 비사용 여부
  - texture
  - fog
  - vertex colors
  - morphing
  - shadow map
  - alpha test
  - transparent

이러한 것들은 새로운 **shader 프로그램** 생성이 필요합니다. 다음과 같이 설정합니다.

```js
material.needsUpdate = true;
```

이 기능은 매우 느리고 프레임이 끊겨보일 수 있다는 점 (특히 Windows처럼 shader 편집이 DirectX에서 OpenGL보다 느린 경우)을 명심해주세요.

좀 더 부드럽게 하기 위해서는, 값이 0인 빛, 흰색 텍스쳐, 밀도가 0인 안개 등의 **가상** 값을 가지도록 특성들을 변경해 시뮬레이션 해 볼 수 있습니다.

기하학 블록에 사용되는 재질을 자유롭게 바꿀 수 있지만, 오브젝트를 어떻게 블록으로 나눌 지에 대한 점은 변경할 수 없습니다.

#### 런타임 중에 재질이 서로 다른 설정을 해야 할 때

재질과 블록의 수가 적다면, 오브젝트를 미리 분리해놓을 수 있습니다. (예를 들면 사람은 머리/얼굴/상의/하의로, 자동차는 앞부분/옆부분/윗부분/유리/타이어/내부)

수가 많다면 (예를 들어 모든 얼굴들이 조금씩 다른 경우) 다른 해결 방법을 생각해봐야 하는데, 속성/텍스쳐를 사용하여 얼굴마다 다른 형태를 입히는 방법 등이 있을 것입니다.

## 텍스쳐(Texture)

사진,그림,영상 및 데이터 텍스쳐를 변경했다면 다음과 같은 플래스 설정이 필요합니다.

```js
texture.needsUpdate = true;
```

## 카메라(camera)

카메라 위치와 대상은 자동으로 업데이트 됩니다. 만약 변경을 원한다면

- fov
- aspect
- near
- far

이후에 투영되는 행렬구조를 다시 계산하면 됩니다.

```js
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
```
