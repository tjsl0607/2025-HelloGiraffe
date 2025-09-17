// src/pages/MainPage.jsx (아이콘 추가 버전)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DialogueList from "../components/DialogueList";
import { getDialogues, deleteDialogue } from "../api/dialogueService.js";
// 👇 1. react-icons에서 사용할 아이콘들을 가져옵니다.
import {
  BsLayoutTextWindowReverse,
  BsChatHeart,
  BsArchive,
  BsPlusLg, // 👈 1. + 모양 아이콘을 가져옵니다.
} from "react-icons/bs";

function MainPage() {
  const [dialogues, setDialogues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDialogues = async () => {
      try {
        const data = await getDialogues();
        setDialogues(data);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDialogues();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("이 기록을 정말 삭제하시겠어요?")) {
      try {
        await deleteDialogue(id);
        setDialogues((prev) => prev.filter((d) => d.id !== id));
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main>
        <section className="hero-section">
          <h1 className="hero-title">
            더 나은 관계를 위한
            <br />
            솔직한 마음 대화법
          </h1>
          <p className="hero-subtitle">
            HelloGiraffe는 비폭력대화(NVC)를 기반으로
            <br />
            건강한 관계를 만들어가도록 돕는 마음 대화 가이드입니다.
          </p>
          {/* 👇 2. 버튼의 클래스명을 변경하고 아이콘을 추가합니다. */}
          <Link to="/new" className="button button-cta">
            <BsPlusLg />
            새로운 대화 시작하기
          </Link>
        </section>

        <section className="features-section">
          <h2 className="section-title">주요 기능</h2>
          <div className="features-grid">
            {/* 👇 2. 각 feature-card에 아이콘을 추가합니다. */}
            <div className="feature-card">
              <BsLayoutTextWindowReverse className="feature-icon" />
              <h3 className="feature-title">상황별 시나리오</h3>
              <p className="feature-description">
                가족, 친구, 연인과의 갈등 등 어려운 상황에 맞는 시나리오를 통해
                대화를 쉽게 시작할 수 있습니다.
              </p>
            </div>
            <div className="feature-card">
              <BsChatHeart className="feature-icon" />
              <h3 className="feature-title">4단계 대화 가이드</h3>
              <p className="feature-description">
                '관찰-느낌-욕구-부탁' 4가지 핵심 요소를 통해 자신의 마음을
                차분하게 들여다보고 표현하도록 돕습니다.
              </p>
            </div>
            <div className="feature-card">
              <BsArchive className="feature-icon" />
              <h3 className="feature-title">마음 기록 관리</h3>
              <p className="feature-description">
                나눴던 대화의 기록을 언제든지 다시 확인하고, 생각의 변화를
                되돌아볼 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <div className="history-container">
          <section className="dialogue-list-section">
            <h2 className="section-title">최근 대화 기록</h2>
            {isLoading ? (
              <p className="empty-list-message">기록을 불러오는 중...</p>
            ) : (
              <DialogueList dialogues={dialogues} onDelete={handleDelete} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
