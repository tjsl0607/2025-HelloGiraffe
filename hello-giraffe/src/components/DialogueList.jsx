// src/components/DialogueList.jsx
import React from "react";
import DialogueListItem from "./DialogueListItem";

// onDelete를 props로 받습니다.
function DialogueList({ dialogues, onDelete }) {
  if (dialogues.length === 0) {
    return (
      <p className="empty-list-message">
        아직 작성된 대화 기록이 없습니다.
        <br />
        새로운 대화를 시작해보세요!
      </p>
    );
  }

  return (
    <div className="dialogue-list">
      {dialogues.map((dialogue) => (
        // onDelete를 그대로 자식에게 전달합니다.
        <DialogueListItem
          key={dialogue.id}
          dialogue={dialogue}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default DialogueList;
