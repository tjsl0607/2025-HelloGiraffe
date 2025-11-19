// src/pages/DialoguePage.jsx (수정 버전)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogueStep from "../components/DialogueStep";
import { scenarios } from "../data/scenarios.js";
import { saveDialogue } from "../api/dialogueService.js";
import { FaArrowLeft, FaArrowRight, FaCheck, FaMagic } from "react-icons/fa";
import axios from "axios";

function DialoguePage({ user }) {
  const navigate = useNavigate();
  const [currentScenarioId, setCurrentScenarioId] = useState(null);
  const [inputs, setInputs] = useState({});

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const [isCoaching, setIsCoaching] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  // 한글을 영어 키로 변환하는 매핑 추가
  const phaseMap = {
    관찰: "observation",
    느낌: "feeling",
    욕구: "need",
    부탁: "request",
  };

  const handleInputChange = (phase, value) => {
    // 한글 phase를 영어 키로 변환
    const key = phaseMap[phase] || phase.toLowerCase();
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // handleSave 함수를 비동기 함수로 수정
  const handleSave = async () => {
    // 로그인이 안 되어 있으면 저장 막기
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const currentScenario = scenarios[currentScenarioId];

    const newDialogue = {
      scenarioTitle: currentScenario.title,
      steps: inputs,
    };

    try {
      // saveDialogue 호출 시 user.uid를 두 번째 인자로 전달
      await saveDialogue(newDialogue, user.uid);
      alert("마음 기록이 저장되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAiCoaching = async () => {
    const { observation, feeling, need, request } = inputs;
    if (!observation || !feeling || !need || !request) {
      alert("AI 코칭을 받으려면 4단계를 모두 작성해야 합니다.");
      return;
    }

    setIsCoaching(true); // 로딩 시작
    setAiFeedback("");

    const VERCEL_COACH_URL = "https://hello-giraffe-proxy.vercel.app/api/coach";
    try {
      // Vercel 서버로 axios 요청
      const result = await axios.post(
        VERCEL_COACH_URL,
        {
          observation,
          feeling,
          need,
          request,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Vercel이 전달해준 피드백을 state에 저장
      setAiFeedback(result.data.feedback);
    } catch (error) {
      console.error("AI 코칭 중 오류 발생:", error);
      setAiFeedback(
        "코칭을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsCoaching(false); // 로딩 종료
    }
  };

  const handleNext = () => {
    const totalSteps = scenarios[currentScenarioId].steps.length;
    setActiveStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
  };
  const currentScenario = currentScenarioId
    ? scenarios[currentScenarioId]
    : null;
  if (!currentScenarioId) {
    if (!user) {
      return (
        <div>
          <main className="page-container">
            <p className="empty-list-message">
              대화를 기록하려면 먼저 로그인을 해주세요.
            </p>
          </main>
        </div>
      );
    }
    // 시나리오 선택 화면
    if (!currentScenario) {
      return (
        <main className="page-container">
          <h1 className="page-title">
            어떤 상황에 대해 이야기하고 싶으신가요?
          </h1>
          {/* 그리드 레이아웃을 사용. */}
          <div className="scenario-grid">
            {Object.keys(scenarios).map((key) => {
              const scenario = scenarios[key];
              const ScenarioIcon = scenario.icon; // 아이콘 컴포넌트를 가져옵니다.
              return (
                <div
                  key={key}
                  className="scenario-card" // 새로운 스타일 클래스를 사용합니다.
                  onClick={() => setCurrentScenarioId(key)}
                >
                  {/* 아이콘 렌더링 */}
                  {ScenarioIcon && <ScenarioIcon className="scenario-icon" />}
                  <h3 className="scenario-title">{scenario.title}</h3>
                </div>
              );
            })}
          </div>
        </main>
      );
    }
  }
  // 선택된 시나리오의 가이드 화면
  return (
    <main className="page-container">
      <h1 className="page-title">{currentScenario.title}</h1>

      {/* --- 1. Stepper UI --- */}
      <div className="stepper-container">
        {currentScenario.steps.map((step, index) => {
          const isCompleted = inputs[phaseMap[step.phase]]?.length > 0;
          return (
            <React.Fragment key={index}>
              <div
                className={`step-item ${
                  index === activeStepIndex ? "active" : ""
                } ${isCompleted ? "completed" : ""}`}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-phase">{step.phase}</div>
              </div>
              {index < currentScenario.steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* --- 2. Step Content --- */}
      <div className="step-content">
        <DialogueStep
          step={currentScenario.steps[activeStepIndex]}
          value={
            inputs[phaseMap[currentScenario.steps[activeStepIndex].phase]] || ""
          }
          onChange={(e) =>
            handleInputChange(
              currentScenario.steps[activeStepIndex].phase,
              e.target.value
            )
          }
        />
      </div>

      {/* --- 3. Navigation Buttons --- */}
      <div className="navigation-buttons">
        <button
          className="button"
          onClick={handlePrev}
          disabled={activeStepIndex === 0}
        >
          <FaArrowLeft />
          이전
        </button>
        {activeStepIndex === currentScenario.steps.length - 1 ? (
          <>
            <button
              className="button button-coaching"
              onClick={handleAiCoaching}
              disabled={isCoaching || !user} // 코칭 중이거나 로그아웃 상태면 비활성화
            >
              <FaMagic />
              {isCoaching ? "코칭 생각 중..." : "AI 코칭 받기"}
            </button>
            <button
              className="button button-primary"
              onClick={handleSave}
              disabled={!user}
            >
              <FaCheck />
              마음 기록 저장하기
            </button>
          </>
        ) : (
          <button className="button button-primary" onClick={handleNext}>
            다음
            <FaArrowRight />
          </button>
        )}
      </div>
      {isCoaching && (
        <div className="ai-coaching-result loading">
          <p>'기린' 코치가 당신의 마음을 읽고 있어요. 잠시만 기다려주세요...</p>
        </div>
      )}

      {aiFeedback && !isCoaching && (
        <div className="ai-coaching-result">
          <h3>🦒 기린 코치의 성찰 거울</h3>
          <p>{aiFeedback}</p>
        </div>
      )}
    </main>
  );
}

export default DialoguePage;
