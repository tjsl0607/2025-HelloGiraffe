// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DialogueList from "../components/DialogueList";
// 👇 deleteDialogue를 import 합니다.
import { getDialogues, deleteDialogue } from "../api/dialogueService.js";

function MainPage() {
  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    setDialogues(getDialogues());
  }, []);

  // 👇 삭제 처리 함수를 만듭니다.
  const handleDelete = (id) => {
    // 1. 정말 삭제할 것인지 사용자에게 확인받습니다.
    if (
      window.confirm(
        "이 기록을 정말 삭제하시겠어요? 삭제된 기록은 복구할 수 없습니다."
      )
    ) {
      // 2. API를 호출하여 로컬 스토리지에서 데이터를 삭제합니다.
      const updatedDialogues = deleteDialogue(id);

      // 3. 화면(State)을 새로운 목록으로 즉시 업데이트합니다.
      setDialogues(updatedDialogues);
    }
  };

  return (
    <div>
      <Header />
      <main className="page-container">
        <Link to="/new" className="button button-primary">
          + 새로운 마음 기록하기
        </Link>
        {/* 👇 DialogueList에 handleDelete 함수를 전달합니다. */}
        <DialogueList dialogues={dialogues} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default MainPage;
