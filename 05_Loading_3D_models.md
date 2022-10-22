# 3D 모델 불러오기(Loading 3D models)

3D 모델들은 각자 다양한 목적, 적합한 특성, 다양한 복잡성을 가지고 수백개의 파일 포맷으로 존재할 수 있습니다. three.js는 다양한 로더를 지원하지만, 알맞은 **포맷** 과 **워크플로우**를 선택하는 것이 시간을 아끼고 이후에 생길 문제를 방지할 수 있는 방법입니다. 몇몇 포맷들은 작업하기 어렵거나, 실시간으로 반영하기 어렵거나, 단순히 지금 시점에 전부 지원을 안하기도 합니다.

## 추천 워크플로우

가능하다면,glTF(GL Tranmission Format)를 사용하는 것을 추천드립니다. `GLB`와 `GLTF`버전 포맷 모두 잘 지원될 것입니다.
속성으로는 `meshes, materials, textures, skins, skeletons, morph targets, animations, lights, cameras`가 있습닏나.

퍼블릭 도메인 glTF 파일은 `Sketchfab` 사이트처럼 사용할 수 있고, 다양한 툴들에서 glTF로 출력해 사용할 수 있습니다.

- Blender
- Substance Painter
- Modo
- Toolbag
- Cinema 4D
- COLLADA2GLTF
- FBX2GLTF
- OBJ2GLTF

`glTF` 이외에도, `FBX`,`OBJ`,`COLLADA` 같은 유명한 포맷들도 잘 지원됩니다.

## 로딩

three.js에는 몇몇 로더들을 제외하고는 기본적으로 include되어 있지 않습니다. 다른 로더들은 개별적으로 앱에 추가해줘야 합니다.

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
```

로더를 import한 후에, scene에 모델을 로드하면 됩니다. 구문은 로더에 따라 다릅니다. 다른 포맷을 사용할 경우에는, 해당 로더에 대한 예제와 문서를 참고하세요. glTF의 경우 글로벌 스크립트는 다음과 같이 사용합니다.

```js
const loader = new GLTFLoader();

loader.load(
  "path/to/model.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
```

## 모델 문제 해결

모델링하고나서 업로드 했더니 왜곡돼있거나 색이 안 칠해져있거나 아예 나오지 않을 때가 있습니다. 다음 순서대로 문제 해결을 해 봅시다

1. 자바스크립트 콘솔 에러를 체크합니다. `.load()`를 사용할 때 로그 결과에 `onError`콜백을 사용했는지를 확인합니다.
2. 다른 애플리케이션의 모델을 확인합니다. glTF에서는, 드래그-앤-드롭 뷰어가 `three.js`와 `babylon.js`에서 사용 가능합니다.
3. 모델을 확대 혹은 축소해 보세요. 여러 모델들은 다양하게 확대 및 축소되어 보여질 수 있으며 너무 큰 모델은 카메라가 모델 안에 있어 제대로 안 보일 수 있습니다.
4. 밝은 모델을 사용하거나 위치를 바꿔보세요. 모델이 가려져 있을 수 있습니다.
