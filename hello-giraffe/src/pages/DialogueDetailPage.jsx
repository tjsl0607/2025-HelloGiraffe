// src/pages/DialogueDetailPage.jsx (Firebase 연동 버전)
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import { getDialogueById } from "../api/dialogueService"; //
import { FaArrowLeft } from "react-icons/fa";

// App.jsx로부터 user 정보를 props로 받음
function DialogueDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate(); // navigate 함수 사용
  const [dialogue, setDialogue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchDialogue = async () => {
      try {
        const foundDialogue = await getDialogueById(id); // ID로 직접 조회

        if (foundDialogue) {
          // 가져온 데이터의 주인이 현재 로그인한 사용자인지 한번 더 확인
          if (user && foundDialogue.userId === user.uid) {
            setDialogue(foundDialogue);
          } else {
            // 데이터는 있지만 내 것이 아닌 경우
            setError("이 기록에 접근할 권한이 없습니다.");
          }
        } else {
          // 데이터를 찾지 못한 경우
          setError("해당 기록을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("데이터를 불러오는 중 오류 발생:", err);
        setError("기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    // 로그인 상태가 확인된 후에 데이터를 가져옴
    if (user !== undefined) {
      fetchDialogue();
    }
  }, [id, user]); // useEffect의 의존성 배열에 user 추가

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div>
        <main className="page-container">
          <p className="empty-list-message">기록을 불러오는 중...</p>
        </main>
      </div>
    );
  }

  // 기록을 찾지 못했을 때
  if (error) {
    return (
      <div>
        {/* Header에는 이미 user가 전달되고 있음 */}
        <main className="page-container">
          <p className="empty-list-message">
            {error}
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
  );
}

export default DialogueDetailPage;
