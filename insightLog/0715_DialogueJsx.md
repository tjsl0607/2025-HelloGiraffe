# DialogueStep.jsx 문법

## 문법 정리

### JavaScript 객체를 이용한 스타일링

- React에서는 CSS 속성을 자바스크립트 객체 형태로 정의해 스타일에 적용 가능
- 이 때, CSS에선 -으로 연결했던 글자들은 카멜(낙타)케이스 방식으로 작성하게 됨.
- 각 속성값은 문자열 안에 넣어줌.

### JSX와 style 속성

style={cardStyle}

- 중괄호는 안에 자바스크립트를 쓸 거야란 신호.

### Props와 객체 구조 분해 할당

#### function DialogueStep({step}) {...}

##### Props(속성)

부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용하는 값.
예: <DialogueStep step={stepDate} />

##### 객체 구조 분해 할당

**{step}**

- 원래는 function DialogueStep(props) {...} 형태로 pros라는 객체를 받은 뒤, 내부에서 const step = props.step;처럼 필요한 값을 꺼내써야 했음.
