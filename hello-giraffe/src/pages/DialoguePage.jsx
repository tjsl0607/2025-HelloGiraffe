// src/pages/DialoguePage.jsx (수정 버전)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DialogueStep from "../components/DialogueStep";
import { scenarios } from "../data/scenarios.js";
import { saveDialogue } from "../api/dialogueService.js";

function DialoguePage() {
  const navigate = useNavigate();
  const [currentScenarioId, setCurrentScenarioId] = useState(null);
  const [inputs, setInputs] = useState({});

  // 👇 한글을 영어 키로 변환하는 매핑 추가
  const phaseMap = {
    관찰: "observation",
    느낌: "feeling",
    욕구: "need",
    부탁: "request",
  };

  // 👇 수정된 handleInputChange
  const handleInputChange = (phase, value) => {
    // 한글 phase를 영어 키로 변환
    const key = phaseMap[phase] || phase.toLowerCase();
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const currentScenario = scenarios[currentScenarioId];

    // 👇 디버깅: 저장 전 inputs 확인
    console.log("저장 전 inputs 상태:", inputs);

    const newDialogue = {
      id: Date.now(),
      scenarioTitle: currentScenario.title,
      createdAt: new Date().toISOString(),
      steps: {
        observation: inputs.observation || "",
        feeling: inputs.feeling || "",
        need: inputs.need || "",
        request: inputs.request || "",
      },
    };

    console.log("저장할 dialogue:", newDialogue);

    saveDialogue(newDialogue);
    alert("대화가 성공적으로 저장되었습니다!");
    navigate("/");
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
          {Object.keys(scenarios).map((key) => (
            <div
              key={key}
              className="dialogue-list-item"
              onClick={() => setCurrentScenarioId(key)}
              style={{ cursor: "pointer" }}
            >
              <div className="item-content">
                <h3 className="item-title">{scenarios[key].title}</h3>
              </div>
            </div>
          ))}
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
        {currentScenario.steps.map((step, index) => {
          // 👇 한글 phase를 영어 키로 변환해서 value 찾기
          const key = phaseMap[step.phase] || step.phase.toLowerCase();

          return (
            <DialogueStep
              key={index}
              step={step}
              value={inputs[key] || ""}
              onChange={(e) => handleInputChange(step.phase, e.target.value)}
            />
          );
        })}
        <button className="button button-success" onClick={handleSave}>
          이 마음 기록하기
        </button>
      </main>
    </div>
  );
}

export default DialoguePage;
