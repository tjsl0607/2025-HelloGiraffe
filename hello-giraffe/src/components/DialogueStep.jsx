import React from "react";

const cardStyle = {
  border: "1px solid #ddd", //테두리 실선
  borderDadius: "8px", //테두리 둥글게
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "white",
  boxShadow: "o 2px 4px rgba(0,0,0,0.1)",
};

const phaseStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#4a90e2",
};

const guideStyle = {
  margin: "10px 0",
  color: "#555",
};

const textareaStyle = {
  width: "calc(100% - 20px)",
  minHeight: "80px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "1em",
  marginTop: "10px",
};

//부모로부터 step 데이터를 받아 화면에 표시하는 기능
function DialogueStep({ step }) {
  return (
    <div style={cardStyle}>
      <h2 style={phaseStyle}>{step.phase}</h2>
      <p style={guideStyle}>{step.guide}</p>
      <textarea style={textareaStyle} placeholder={step.placeholder} />
    </div>
  );
}

export default DialogueStep;
