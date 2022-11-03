## AnimationAction

AnimationActions는 `AnimationClips`에 저장된 애니메이션을 예약하는 데 사용됩니다.

### 생성자

```js
AnimationAction(mixer: AnimationMixer, clip: AnimationClip, localRoot: Object3D)
```

`mixer` - 애니메이션 믹서는 애니메이션 액션에 의해 제어됩니다.
`clip` - 애니메이션 클립은 애니메이션 액션에 대한 애니메이션 데이터를 보유하고 있습니다.
`localRoot` - 루트 오브젝트는 애니메이션 액션을 수행합니다.

### 속성
`.clampWhenFinished` : Boolean
`clampWhenFinished` 가 `true`로 설정 되었을 경우 자동으로 애니메이션의 마지막 프레임에서 paused 됩니다.
`clampWhenFinished` 가 `false`로 설정 되었을 경우 마지막 루프의 작업이 완료 될 때 enabled을 자동으로 false로 전환되어, 더이상 작업에 영향을 주지 않습니다.
초기값은 `false`입니다.

`.enabled` : Boolean
`enabled`를 `false`로 설정하면 작업이 비활성화 되어 아무런 영향을 주지 않습니다. 기본값은 `true`입니다.
애니메이션 액션이 다시 활성화되면, 현재 time 부터 연속적으로 애니메이션이 활성화 됩니다.
`enabled`를 `true`로 설정해도 자동적으로 애니메이션이 재시작하지 않습니다.

`.loop`: number
반복모드, 기본값은 `THREE.LoopRepeat`

다음의 상수값 중 하나여야 함:
* `THREE.LoopOnce` - 클립 한번 재생
* `THREE.LoopRepeat` - 클립의 끝에서 시작 부분으로 즉시 이동할 때마다 선택한 **repetitions** 수 마늠 클립 재생
* `THREE.LoopPingPong` - 선택한 **repetitions** 수 만큼 클립을 앞뒤로 재생

애니메이션 액션에서 수행된 `AnimationClip`의 반복 횟수입니다. `setLoop`를 통해 설정할 수 있습니다. 기본값은 무한대입니다.

`.time` : number
애니메이션 액션의 로컬 시간 속성(초 단위, 0부터 시작)

시간 속성은 값이 고정 되거나, 반복 상태에 따라 0 ... clip.duration 으로 래핑 됩니다. `timeScale`을 변경하여 글로벌 믹서 타임을 상대적으로 확장할 수 있습니다.