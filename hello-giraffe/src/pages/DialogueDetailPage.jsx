// src/pages/DialogueDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDialogues } from "../api/dialogueService";
import Header from "../components/Header";

function DialogueDetailPage() {
  const { id } = useParams(); // URL에서 :id 부분을 가져옵니다.
  const [dialogue, setDialogue] = useState(null);

  useEffect(() => {
    const allDialogues = getDialogues();
    const foundDialogue = allDialogues.find((d) => d.id.toString() === id);

    // 👇 디버깅: 찾은 데이터 구조 확인
    console.log("찾은 대화 기록:", foundDialogue);
    if (foundDialogue) {
      console.log("steps 내용:", foundDialogue.steps);
    }

    setDialogue(foundDialogue);
  }, [id]);

  // 기록을 찾지 못했다면...
  if (!dialogue) {
    return (
      <div>
        <Header />
        <main className="page-container">
          <p className="empty-list-message">해당 기록을 찾을 수 없습니다.</p>
        </main>
      </div>
    );
  }

  // 기록을 찾았다면 상세 내용을 보여줍니다.
  return (
    <div>
      <Header />
      <main className="page-container">
        <h1 className="page-title">{dialogue.scenarioTitle}</h1>
        <div className="dialogue-card">
          <h2 className="dialogue-phase">관찰</h2>
          <p className="dialogue-guide">{dialogue.steps.observation}</p>
        </div>
        <div className="dialogue-card">
          <h2 className="dialogue-phase">느낌</h2>
          <p className="dialogue-guide">{dialogue.steps.feeling}</p>
        </div>
        <div className="dialogue-card">
          <h2 className="dialogue-phase">욕구</h2>
          <p className="dialogue-guide">{dialogue.steps.need}</p>
        </div>
        <div className="dialogue-card">
          <h2 className="dialogue-phase">부탁</h2>
          <p className="dialogue-guide">{dialogue.steps.request}</p>
        </div>
        <Link
          to="/"
          className="button button-primary"
          style={{ marginTop: "20px" }}
        >
          목록으로 돌아가기
        </Link>
      </main>
    </div>
  );
}

export default DialogueDetailPage;
