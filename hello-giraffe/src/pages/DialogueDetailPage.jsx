// src/pages/DialogueDetailPage.jsx (Firebase 연동 버전)
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDialogues } from "../api/dialogueService";
import Header from "../components/Header";
import { FaArrowLeft } from "react-icons/fa";

function DialogueDetailPage() {
  const { id } = useParams();
  const [dialogue, setDialogue] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  //  useEffect에서 비동기 데이터를 가져오도록 수정
  useEffect(() => {
    const fetchDialogue = async () => {
      try {
        const allDialogues = await getDialogues();
        const foundDialogue = allDialogues.find((d) => d.id === id);
        setDialogue(foundDialogue);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDialogue();
  }, [id]);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div>
        <Header />
        <main className="page-container">
          <p className="empty-list-message">기록을 불러오는 중...</p>
        </main>
      </div>
    );
  }

  // 기록을 찾지 못했을 때
  if (!dialogue) {
    return (
      <div>
        <Header />
        <main className="page-container">
          <p className="empty-list-message">
            해당 기록을 찾을 수 없습니다.
            <br />
            <br />
            <Link to="/" className="button button-primary">
              홈으로 돌아가기
            </Link>
          </p>
        </main>
      </div>
    );
  }

  // 기록을 찾았을 때
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

        <Link to="/" className="back-to-list-link">
          <FaArrowLeft /> 목록으로 돌아가기
        </Link>
      </main>
    </div>
  );
}

export default DialogueDetailPage;
