https://threejs.org/docs/index.html#manual/ko/introduction/Creating-a-scene

# Scene 만들기
three.js 로 무언가를 표현하려면 scene,camera 그리고 renderer 가 필요합니다. 이를 통해 카메라로 장면을 구현할 수 있습니다.

```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

`three.js` 에는 몇가지 종류의 카메라가 있는데 이번에는 `PerspectiveCamera`를 사용해 봅시다.

## PerspectiveCamera

```js
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
```

* 첫 번째 속성은 `field of view(시야각)`입니다. FOV(시야각)는 해당 시점의 화면이 보여지는 정도를 나타냅니다. 값은 각도 값으로 설정합니다.
* 두 번째 속성은 `aspect ratio(종횡비)`입니다. 대부분의 경우 요소의 높이와 너비에 맞추어 표시하게 할텐데, 그렇지 않으면 와이드스크린에 옛날 영화를 트는 것처럼 이미지가 틀어져 보일 것입니다.
* 다음 두 속성(**0.1, 1000**)은 `near` 와 `far` 절단면입니다. 무슨 뜻인가 하면, `far`값 보다 멀리 있는 요소나 `near` 값보다 가까이 있는 오브젝트는 렌더링 되지 않는다는 뜻입니다. 지금 시점에서 이것까지 고려할 필요는 없지만, 앱 성능 향상을 위해 사용할 수 있습니다.

## renderer
```js
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

다음은 `renderer`입니다. 같이 사용하는 `WebGLRenderer` 와 더불어, three.js는 다른 몇가지 renderer를 사용하는데, 오래된 브라우저 혹은 모종의 사유로 WebGL을 지원 안할때의 대비용으로 사용하는 것입니다.

`renderer` 인스턴스를 생성함과 동시에, 렌더링 할 곳의 크기를 설정해줘야합니다. 렌더링할 구역의 높이와 너비를 설정하는 것은 좋은 방법입니다. 이 경우, 높이와 너비는 각각 브라우저 윈도우의 크기가 됩니다. 성능개선을 중시하는 앱의 경우, `setSize`를 사용하거나 `window.innerWidth/2, window.innerHeight/2`를 사용해서 **화면 크기의 절반**으로 구현할 수도 있습니다.

사이즈는 그대로 유지하고 싶지만 **더 낮은 해상도**로 렌더링하고 싶을 경우, `setSize`의 `updateStyle`(세 번째 파라미터)를 **false**로 불러오면 됩니다.
```js
setSize(window.innerWidth/2, window.innerHeight/2, false)
```
처럼 사용하면 `canvas`태그가 100%의 높이, 너비로 되어있다는 기준 하에 절반의 해상도로 렌더링 될 것입니다.

마지막으로 제일 중요한 `renderer` 엘리먼트를 HTML 문서 안에 넣었습니다. 이는 `canvas` 엘리먼트로, renderer가 scene을 나타내는 구역입니다.

## BoxGeomerty 와 MeshBasicMaterial
```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
```

**큐브**(첫 예제)를 만드려면, `BoxGeometry`가 필요합니다. 여기에는 큐브에 필요한 모든 꼭짓점(vertices) 와 면(faces)이 포함돼 있습니다. 여기에 대해서는 나중에 더 자세히 알아봅시다.

geometry와 더불어, 무언가를 색칠해줄 요소가 필요합니다. Three.js에서는 여러 방법을 고려했지만, 현재로서는 `MeshBasicMaterial`을 고수하고자 합니다. 이 속성이 적용된 오브젝터들은 모두 영향을 받을 것입니다.
가장 단순하게 알아볼 수 있도록, 여기에는 녹색인 0x00ff00만을 속성으로 사용하겠습니다. **CSS**나 Photoshop에서처럼 (**Hex colors**)로 동일하게 작동합니다.

세 번째로 필요한 것은 `Mesh`입니다. mesh는 기하학을 받아 재질을 적용하고 우리가 화면 안에 삽입하고 자유롭게 움직일 수 있게 해 줍니다.

기본 설정상 `scene.add()`를 불러오면, 추가된 모든 것들은 `(0,0,0)` 속성을 가집니다. 이렇게 되면 카메라와 큐브가 동일한 위치에 겹치게 되겠죠. 이를 피하게 위해, 카메라를 약간 움직여 두었습니다.


# scene 렌더링
맨 처음에 있던 HTML 파일을 복사해서 열어놨다면, 아무것도 보이지 않을 것입니다. 왜냐하면 아직 아무것도 렌더링하지 않았기 때문입니다. 이를 해결하려면 `render or animate loop` 라는 것이 필요합니다.

```js
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera);
}
animate()
```

이 코드는 화면이 새로고침 될 때마다 계속해서 렌더링을 해 줄 것입니다.(일반적인 경우에 **1초에 60번** 렌더링 됩니다.) 웹 브라우저에서 게임을 만들기 시작한 지 얼마 안 된 분이라면, "왜 그냥 setinterval을 쓰지 않는 거죠?" 라고 질문할 수도 있을 겁니다. 단적으로 말하면 가능은 합니다. 하지만 `requestAnimationFrame`을 사용하는 것이 훨씬 이점이 많습니다. 아마 가장 큰 이점은 유저가 브라우저 창에서 이탈했을때 멈춰주는 기능일 것입니다. 이를 통해 소중한 전력과 배터리를 아낄 수 있죠.

# 큐브 애니메이팅
시작할 때 만들었던 파일에 이전까지의 코드를 모두 작성해서 넣었을 경우, 초록색 박스를 확인할 수 있을 것입니다. 이 박스를 **회전**시켜 보면서 조금 더 재미있게 만들어봅시다.

다음 코드를 `animate`함수 안의 `renderer.render` 바로 위에 넣어주세요
```js
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
```

위 코드는 모든 프레임마다 실행되면서 (일반적으로 **1초에 60번**), 큐브가 멋지게 돌아가도록 만들어 줄겁니다. 기본적으로 앱을 실행하는 동안 무언가를 움직이거나 변형하고 싶을때, `animate loop`를 사용하면 됩니다. 물론 다른 함수를 불러올 수도 있고, `animate` 함수 안에 수백줄을 작성할 필요도 없습니다.

# 결과 화면

첫 three.js가 완성되었네요. 이제 본격적으로 시작해보면 됩니다.

전체 코드는 아래에 나와 있고 `https://jsfiddle.net/fxurzeb4/` 로도 확인해 볼 수 있습니다. 잘 살펴보고 어떻게 구동되는지 확인해 보세요.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
			canvas { display: block; }
		</style>
	</head>
	<body>
		<script src="js/three.js"></script>
		<script>
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
		</script>
	</body>
</html>
```