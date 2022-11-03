## 후처리 사용 방법(How to use post-processing)

여러 **three.js** 애플리케이션들에서는 3차원 오브젝트를 직접 화면에 렌더링하고 있습니다. 하지만 가끔, DOF, 블룸 필름 그레인 등의 다양한 효과나 다양한 안티 얼레이징 타입을 사용하고 싶을 수도 있습니다. 후처리 방식은 이런 효과를 위해 널리 쓰이는 방법입니다. 먼저, 비디오 카드의 메모리 버퍼에 해당하는 대상을 렌더링하기 위해 장면이 그려집니다. 그 다음 혹은 화면이 최종적으로 렌더링되기 전에 하나 또는 여러 개의 후처리를 통해 필터와 효과를 이미지 버퍼에 적용합니다.

three.js는 완벽한 후처리 솔루션인 `EffectComposer`를 통해 작업 환경을 구현합니다.

### 작업 절차

먼저 해야 할 일은 examples 디렉토리의 모든 필요한 파일들을 불러오는 것입니다. three.js의 공식 가이드 **npm package**를 따르고 있다고 가정합니다. 기본 데모 활용에는 아래와 같은 파일들이 필요합니다.

```js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RanderPass } from 'three/addons/postprocessing/RanderPass.js';
import { GlichPass } from 'three/addons/postprocessing/GlichPass.js';
```

모든 파일들을 잘 불러왔다면, `composer`를 만들어 `WebGLRenderer` 인스턴스를 넘겨줍니다.

```js
cosnt composer = new EffectComposer(renderer);
```

`composer`를 사용할 때, 앱의 애니메이션 루프를 변경해주는 것이 중요합닌다. `WebGLRenderer`의 `render` 메서드를 호풀하지 말고, 이제부터 각각의 `EffectComposer`에 대응되는 렌더링 방법을 사용합니다.

```js
function animate() {
    requestAnimationFrame( animate );
    composer.render()
}
```

`composer`는 이제 준비가 다 되었으니, 후처리 과정 연결을 설정할 수 있습니다. 이러한 과정은 앱을 만드는 최종 화면 출력을 담당하며, 첨부/삽입한 순서대로 처리합니다. 이 예제에서 먼저 실행한 것은 `RenderPass` 인스턴스이고 그 다음이 `GlitchPass` 입니다. 마지막 과정이 끝나면 자동으로 화면에 렌더링됩니다. 패스 설정은 아래와 같습니다.

```js
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass)

const glitchPass = new GlitchPass();
composer.addPass(glitchPass);
```

`RenderPass`는 일반적으로 맨 위에 위치해서 렌더링된 장면을 후처리의 기본 입력 장면으로 활용합니다. 예제의 경우, GlitchPass는 이미지 데이터에 거친 글리치 효과를 넣어줍니다. **live example**에서 작동을 확인해 보세요.