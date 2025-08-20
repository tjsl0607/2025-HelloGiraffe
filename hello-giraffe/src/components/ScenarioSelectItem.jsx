// src/components/ScenarioSelectItem.jsx
import React from "react";

// 이 컴포넌트는 Link가 아니라 일반 div입니다.
// 클릭하면 부모로부터 받은 onClick 함수를 실행합니다.
function ScenarioSelectItem({ scenario, onClick }) {
  return (
    <div className="dialogue-list-item" onClick={onClick}>
      <div className="item-content">
        <h3 className="item-title">{scenario.title}</h3>
      </div>
    </div>
  );
}

export default ScenarioSelectItem;
