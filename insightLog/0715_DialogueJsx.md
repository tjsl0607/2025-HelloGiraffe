# DialogueStep.jsx 문법

## 문법 정리

### CSS 속성값 정리

| 명령어          | 기능                      | 속성                                                                                                                                                              |
| --------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| border          | 박스 테두리의 디자인 정의 | 두께, 색상, 실선/점선.파선                                                                                                                                        |
| borderRadius    | 박스의 모서리 둥글기 정의 | 둥글기 정도(px)                                                                                                                                                   |
| padding         | 박스 테두리 안쪽 여백     | px                                                                                                                                                                |
| marginBottom    | 박스 아래쪽 바깥에 여백   | px                                                                                                                                                                |
| backgroundColor | 박스의 배경색 지정        | ''안에 색상 키워드                                                                                                                                                |
| boxShadow       | 박스에 입체감 주는 그림자 | 4가지 부분으로 이루어짐. 1. 가로 위치: 그림자가 좌우로 치우치는가 2. 세로 위치: 그림자가 상하로 치우치는가(평면좌표계를 상상) 3. 흐림 정도 4. rgba: 색상과 투명도 |

#### padding과 margin의 차이

##### 공통점

CSS 레이아웃에서 공간 또는 여백을 만듦.

##### 차이

액자를 상상하자!

1. padding: 안쪽 여백, 액자 속 사진과 액자 틀 사이의 공간. padding은 액자 자체의 일부이며 액자의 배경색을 가짐. 테두리와 요소가 너무 가까울 때 사용.
2. margin: 바깥쪽 여백, 벽에 걸린 액자와 그 옆의 다른 액자 사이의 간격, 요소의 테두리 바깥쪽 공간을 의미. 다른 요소와의 거리를 만들기 위함.

### 후행 쉼표

#### 사용 이유

1. 속성 추가 용이
2. 속성 순서 변경 용이

### CSS 속성간의 줄바꿈

#### 유무의 차이

없다.

#### 사용 이유

가독성 향상.

### JavaScript 객체를 이용한 스타일링

- React에서는 CSS 속성을 자바스크립트 객체 형태로 정의해 스타일에 적용 가능
- 이 때, CSS에선 -으로 연결했던 글자들은 카멜(낙타)케이스 방식으로 작성하게 됨.
- 각 속성값은 문자열 안에 넣어줌.

### JSX와 style 속성

style={cardStyle}

- 중괄호는 안에 자바스크립트를 쓸 거야란 신호.

### Props와 객체 구조 분해 할당

` function DialogueStep({step}) {...}`

#### Props(속성)

부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용하는 값.
예: `<DialogueStep step={stepDate} />`

##### 이해를 위한 비유

손님: 부모 컴포넌트: DialoguePage.jsx

요리사: 자식 컴포넌트: DialogueStep.jsx

주문서(props): 손님이 요리사에게 전달하는 요청사항

손님인 DialoguePage.jsx는 요리사인 DialogueStep.jsx에게 "제가 드리는 'stepDate'라는 레시피로 요리를 만들어주세요"라고 요청한다.

```jsx
<DialogueStep step={stepData} />
// 손님이 요리사에게 주문하는 코드
```

이 코드가 실행되는 순간, 리액트는 step이라는 이름표가 붙은 stepDate 레시피를 담아 요리사에게 주문서 한장을 전달한다. 이 주문서가 props 객체이다. 그 안의 내용물은 아래와 같다.

```javascript
{
    step: {
        phase: "관찰",
        guide: "어떤 일이 있었나요? ...",
        placeholder: "예: 오늘 약속 시간인..."
    }
}
```

이제 요리사(DialogueStep.jsx)는 이 주문서를 받아서 요리를 시작해야 한다. 주문서 확인 방식은 두가지다.

1. 주문서를 통째로 받아서 안에서 내용문 찾기(구조 분해 할당 미사용)

   ```jsx
   fuction DialogueStep(props) { //주문서 뭉치(props)를 통째로 받기
        //요리를 하려면 'step'레시피가 필요하니
        //주문서 안에서 step이라는 이름표가 붙은 레시피를 꺼내야한다.
        const stepRecipe= props.step;

        return (
            <div>
                {/* 제목을 표시하려면 step 레시피 안의 phase를 봐야한다. */}
                <h2>{props.step.phase}</h2>

                {/* 안내 문구를 표시하려면 step 레시피 안의 guide를 봐야 함 */}
                <p>{props.step.guide}</p>
            </div>
        );
   }
   ```

   문제점: 요리할 때마다 "주문서 안에 있는 step 레시피의 phase", "주문서 안에 있는 step 레시피 안에 있는 guide"처럼 매번 props.step.이라는 말을 반복해야 해서 코드가 길고 번거롭다!

2. 주문서에서 필요한 내용물만 쏙 뽑아서 받기.(구조 분해 할당 사용)
   요리사가 주문을 받을 때부터 "주문서 뭉치 전체는 필요없으니 그 안에 있는 step 레시피만 주세요"라고 요청하는 것.

```jsx
//주문서(props)를 받자마자
//그 안에서 {step} 내용물을 꺼내서
//step이라는 변수에 바로 저장하기
function DialogueStep({ step }) {
  //이제 step이라는 변수에는 이미 레시피가 담겨있다.
  //props.step이라고 길게 쓸 필요 없다!
  return (
    <div>
      {/*바로 step 레시피 안의 phase를 볼 수 있다.*/}
      <h2>{step.phase}</h2>

      {/* 바로 step 레시피 안의 phase를 볼 수 있음 */}
      <p>{step.guide}</p>
    </div>
  );
}
```

{step}이라는 코드는 리액트에게 "저에게 전달될 props 객체 안에서 step이라는 속성을 찾아서 그 것을 step이라는 이름의 변수로 만들어 주세요"같은 주문인 것이다.

2.

##### 객체 구조 분해 할당

**{step}**

- 원래는 function DialogueStep(props) {...} 형태로 pros라는 객체를 받은 뒤, 내부에서 const step = props.step;처럼 필요한 값을 꺼내써야 했음.

- {step}은 위의 과정을 한 줄로 줄인 것. props 객체 안에서 step이라는 속성만 꺼내서 바로 step이라는 변수로 사용하겠다는 의미.

> 객체에서 필요한 알맹이만 꺼내쓰는 방법

### JSX 안에서 JavaScript 변수 사용하기

```jsx
<h2>{step.phase}</h2>
<p>{step.guide}</p>
<textarea placeholder={step.placeholder} />
```

JSX코드 안에서 자바스크립트 변수나 표현식을 사용하고 싶을 때 중괄호로 감싸기
예
`{step.phase}`는 부모로부터 전달받은 step 객체이ㅡ phase 속성값을 화면에 표시함.
`placeholder={step.placeholder}`는 <textarea>의 placeholder 속성에 step객체의 placeholder 속성값을 동적으로 넣어준다.
이처럼 DialogueStep 컴포넌트는 부모가 어떤 step을 주느냐에 따라 내용이 바뀌는 재사용 가능한 똑똑한 부품이 되는 것이다.
