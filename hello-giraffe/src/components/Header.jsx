/*개념 복기
jsx는 js에서 html처럼 생긴 코드를 쓸 수 있게 해주는 문법
*/
import React from "react";

//자바스크립트 영역
const headerStyle = {
  backgroundColor: "#4a90e2",
  padding: "20px",
  color: "white",
  textAlign: "center",
  //Align = 정렬하다.
  fontSize: "1.5em",
  fontWeight: "bold",
};

//리액트 컴포넌트(함수) 영역, Header라는 함수 정의
function Header() {
  // JSX 영역
  return <header style={headerStyle}>🦒 HelloGiraffe: 마음을 잇는 대화</header>;
}

//자바스크립트 모듈 내보내기 영역
export default Header;
