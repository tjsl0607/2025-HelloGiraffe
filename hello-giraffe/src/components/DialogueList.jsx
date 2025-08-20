// src/components/DialogueList.jsx
import React from "react";
import DialogueListItem from "./DialogueListItem";

// 👇 onDelete를 props로 받습니다.
function DialogueList({ dialogues, onDelete }) {
  if (dialogues.length === 0) {
    /* ... 기존과 동일 ... */
  }

  return (
    <div className="dialogue-list">
      {dialogues.map((dialogue) => (
        // 👇 onDelete를 그대로 자식에게 전달합니다.
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
