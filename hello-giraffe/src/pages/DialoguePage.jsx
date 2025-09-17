// src/pages/DialoguePage.jsx (수정 버전)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DialogueStep from "../components/DialogueStep";
import { scenarios } from "../data/scenarios.js";
import { saveDialogue } from "../api/dialogueService.js";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

function DialoguePage() {
  const navigate = useNavigate();
  const [currentScenarioId, setCurrentScenarioId] = useState(null);
  const [inputs, setInputs] = useState({});

  const [activeStepIndex, setActiveStepIndex] = useState(0);

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
    const currentScenario = scenarios[currentScenarioId];

    const newDialogue = {
      scenarioTitle: currentScenario.title,
      // `steps`는 `inputs` state에 이미 올바른 형식으로 저장되어 있습니다.
      steps: inputs,
      // id와 createdAt은 이제 dialogueService에서 자동으로 생성합니다.
    };

    try {
      await saveDialogue(newDialogue); // Firestore에 저장될 때까지 기다림
      navigate("/"); // 저장이 완료되면 메인 페이지로 이동
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      // 필요하다면 사용자에게 오류 메시지를 보여줄 수 있습니다.
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

  // 시나리오 선택 화면
  if (!currentScenario) {
    return (
      <div>
        <Header />
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
      </div>
    );
  }

  // 선택된 시나리오의 가이드 화면
  return (
    <div>
      <Header />
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
              inputs[phaseMap[currentScenario.steps[activeStepIndex].phase]] ||
              ""
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
            <button className="button button-primary" onClick={handleSave}>
              <FaCheck />
              마음 기록 저장하기
            </button>
          ) : (
            <button className="button button-primary" onClick={handleNext}>
              다음
              <FaArrowRight />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default DialoguePage;
