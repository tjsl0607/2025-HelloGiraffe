// src/components/DialogueListItem.jsx
import React from "react";
import { Link } from "react-router-dom";

// 👇 부모로부터 onDelete 함수를 받아옵니다.
function DialogueListItem({ dialogue, onDelete }) {
  const formattedDate = new Date(dialogue.createdAt).toLocaleString();

  // 삭제 버튼 클릭 시, 이벤트가 Link로 전파되는 것을 막습니다. (상세 페이지로 이동 방지)
  const handleDeleteClick = (e) => {
    e.preventDefault(); // 기본 동작(링크 이동)을 막습니다.
    e.stopPropagation(); // 이벤트가 부모로 퍼지는 것을 막습니다.
    onDelete(dialogue.id); // 부모에게 삭제 요청을 보냅니다.
  };

  return (
    <Link to={`/dialogue/${dialogue.id}`} style={{ textDecoration: "none" }}>
      <div className="dialogue-list-item">
        <div className="item-content">
          <h3 className="item-title">{dialogue.scenarioTitle}</h3>
          <p className="item-date">{formattedDate}</p>
        </div>
        {/* 👇 삭제 버튼을 추가합니다. */}
        <button className="button-delete" onClick={handleDeleteClick}>
          삭제
        </button>
      </div>
    </Link>
  );
}

export default DialogueListItem;
