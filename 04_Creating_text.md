# 텍스트 만들기(Creating text)

three.js 에서 텍스트를 활용하고 싶을 경우가 많을 것입니다. 그 방법을 몇가지 소개합니다.

### DOM + CSS

HTML을 사용하는 것은 텍스트를 추가하는 가장 쉽고 빠른 방법입니다. 대부분의 three.js 예제에서 오버레이 설명에 사용되는 방식입니다.

내용을 추가하려면 다음과 같이 입력합니다.

```html
<div id="info">Description</div>
```

`absolute position`을 설정하려면 CSS 마크업을 사용하고, 특히 three.js를 전체화면으로 사용한다면 `z-index`를 활용합니다.

```css
#info {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
}
```

### 캔버스에 텍스트를 그리고 Texture로 사용

three.js scene에 손쉽게 텍스트를 그리고싶은 경우에 이 메서드를 사용하세요.

### 본인이 가장 선호하는 3D 모델을 만들고 three.js로 export

본인의 3d 작업을 선호하는 경우 이 메서드를 사용해 three.js로 모델을 import 하세요.

### 절차적 텍스트 geometry

three.js만을 사용해 절차적 및 동적 3d 텍스트 geometry를 사용하고 싶으면, geometry의 `THREE.TextGeometry`의 인스턴스인 `mesh`를 사용하면 됩니다.

```js
new THREE.TextGeometry(text, parameters);
```

하지만 이 작업을 수행하려면, TextGeometry의 'font' 파라미터가 `THREE.Font` 인스턴스로 설정되어 있어야 합니다. 이 과정이 어떻게 작동하는지, 각각의 파라미터에 대한 설명, THREE.js가 가지고 있는 JSON 폰트 리스트를 확인하려면
`TextGeometry` 페이지를 참고해 주세요.
