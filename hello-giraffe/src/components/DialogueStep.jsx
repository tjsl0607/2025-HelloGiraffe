// src/components/DialogueStep.jsx
import React from "react";

function DialogueStep({ step, value, onChange }) {
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
    </div>
  );
}

export default DialogueStep;
