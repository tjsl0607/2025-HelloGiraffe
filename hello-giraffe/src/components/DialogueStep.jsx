// src/components/DialogueStep.jsx
import React, { useState, useEffect } from "react"; // useState, useEffect 추가
const JUDGMENT_KEYWORDS = [
  "항상",
  "절대",
  "맨날",
  "전혀",
  "결코",
  "너는",
  "늘",
  "언제나",
  "매일",
  "또",
];
function DialogueStep({ step, value, onChange }) {
  useEffect(() => {
    if (step.phase === "관찰") {
      // value(사용자 입력값)에 키워드가 포함되어 있는지 확인
      const foundKeyword = JUDGMENT_KEYWORDS.find((keyword) =>
        value.includes(keyword)
      );
      if (foundKeyword) {
        // 키워드를 찾으면 피드백 메시지를 설정하기.
        setFeedback(
          `'${foundKeyword}'(은)는 '관찰'이 아닌 '판단'이나 '해석'일 수 있어요. 상대방의 행동이나 말을 그대로 묘사해볼까요?`
        );
      } else {
        // 키워드가 없으면 피드백 메시지 공백
        setFeedback(null);
      }
    } else {
      // "관찰" 단계가 아니면 항상 피드백 공백
      setFeedback(null);
    }
  }, [value, step.phase]); // value나 step.phase가 바뀔 때마다 이 함수 실행
  const [feedback, setFeedback] = useState(null);
  return (
    <div className="dialogue-card">
      <h2 className="dialogue-phase">{step.phase}</h2>
      <p className="dialogue-guide">{step.guide}</p>
      <textarea
        className="dialogue-textarea"
        placeholder={step.placeholder}
        value={value}
        onChange={onChange}
      />
      {/* feedback 상태에 메시지가 있을 때만 렌더링하기. */}
      {feedback && <p className="feedback-message">{feedback}</p>}
    </div>
  );
}

export default DialogueStep;
