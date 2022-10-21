# 설치(Installation)

three.js는 `npm`을 포함한 빌드 툴에서 설치가 가능하고, `CDN`이나 `Static`호스팅으로 빠르게 사용이 가능합니다. 대부분의 경우 npm을 통한 설치가 가장 좋은 선택입니다.

어떤 방식을 선택하든, 같은 버전의 라이브러리에서 모든 파일을 동일하게 불러와야 합니다. 여러 소스에서 파일을 혼합해 가져오면 코드 중복이 일어나거나 비정상적으로 앱이 종료될 수 있습니다.

**three.js**의 모든 메서드들은 **ES module** 에 기반하고 있으며, 마지막 프로젝트에 필요한 부분만 불러오도록 할 것입니다.

## npm으로 설치하기

`three npm` 모듈을 설치하려면, 프로젝트 폴더의 터미널을 열고 다음을 실행합니다.

```npm
npm install three
```

패키지가 다운로드 및 설치 될 것이며, **다음과 같이 코드에서 불러올 수 있습니다.**

```js
import * as THREE from 'three'

const scene = new THREE.Scene()
```

or

```js
// 하나의 함수만 임포트하는 경우
import { Scene } from 'three';
const scene = new Scene();
```

npm을 통해 설치할 때, 아마 대부분의 경우 모든 패키지를 한 자바스크립트 파일에 결합시켜주는 `bundling tool`을 사용할텐데, three.js는 모든 자바스크립트 번들러에 호환되지만, 가장 널리 쓰이는 것은 `webpack`일것입니다.

모든 속성들이 three 모듈에서 바로 불러와지는 것은 아닙니다. 다른 자주쓰이는 라이브러리들, **controls, loaders, post-processing effects** 같은 것들은 `examples/jsm` 의 하위폴더에서 불러와야 합니다.