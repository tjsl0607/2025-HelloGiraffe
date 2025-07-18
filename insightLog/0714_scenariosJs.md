# 사용한 JS 문법 정리

## export const scenarios = {내용}

### export

#### 의미

수출하다 = 다른 파일에서 객체 등을 가져다 쓸 수 있게 (=import) 공개.

#### 비유

"다른 곳에서도 사용 가능" 스티커 달기와 동일

### const

#### 의미

상수 선언, 다른 값 할당 불가.

### scenarios

#### 의미

변수 이름

## {내용}

= 몸통. 이 안에 쓰인 문법은 아래에 정리.

### 1. {} (객체)

#### 의미

중괄호 {}는 객체를 만드는 문법. 객체는 관련된 데이터를 키값쌍(key : value)로 묶어 관리하는 데이터 구조.

#### 비유

이름표(키)가 붙어 안의 내용물(값)을 볼 수 있는 서랍장

### 2. latePromise: {...}

- 키:값 쌍 형태임.
- latePromise가 키
- : 뒤의 {...}가 값
- 즉, 중첩 구조

### 3. title: "내용"

- 키:값 쌍 형태

### 4. steps: [내용]

- 키 값 쌍
- [값] = 배열
- 배열이란? 순서가 있는 목록
- 관찰느낌욕구부탁 4개 단계는 순서가 있기 때문에 사용.

### 5. 배열 안의 {} 들

- 객체가 쉼표료 구분됨.

> "다른 파일에서 쓸 수 있도록(export), scenarios 라는 이름의 변수를 만들고(const scenarios), 이 변수 안에는 여러 상황별 대화 가이드 정보를 담고 있는 객체({})를 저장한다."
