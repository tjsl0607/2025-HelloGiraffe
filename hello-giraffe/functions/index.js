// .env 파일을 읽기 위해 dotenv 라이브러리
require("dotenv").config();

const { onCall } = require("firebase-functions/v2/https");
const functions = require("firebase-functions"); // HttpsError
const axios = require("axios"); // FriendliAI API를 호출하기 위함

// .env 파일에 저장된 API 키 불러오기
const FRIENDLI_API_KEY = process.env.FRIENDLI_API_KEY;

// FriendliAI API의 고정 주소.
const FRIENDLI_API_URL = "https://api.friendli.ai/v1/chat/completions";

// 백엔드 함수
exports.getNvcCoaching = onCall(async (request) => {
  // 4단계 데이터
  const { observation, feeling, need, request: userRequest } = request.data;

  // FriendliAI에게 보낼 프롬프트
  const systemPrompt = `
    당신은 '기린'이라는 이름을 가진, 공감 능력이 뛰어난 NVC(비폭력대화) 전문 코치입니다.
    사용자가 NVC 4단계(관찰, 느낌, 욕구, 부탁)에 따라 자신의 마음을 작성했습니다.
    이 내용을 바탕으로 사용자가 스스로 성찰할 수 있도록 '생각의 거울' 역할을 해주세요.
    코칭 가이드라인:
    1. 공감 및 검증: 사용자의 느낌과 욕구를 따뜻하게 공감하고 인정해주세요.
    2. 연결고리 확인: 4단계의 흐름이 자연스러운지, '느낌'이 '욕구'와 잘 연결되는지 짚어주세요.
    3. 성찰 질문: 판단하거나 정답을 주지 말고, 1~2개의 부드러운 성찰 질문을 던져주세요.
    4. 따뜻한 어조: 시종일관 친절하고 지지하는 말투를 사용해주세요.
  `;

  const userPrompt = `
    [내 마음 기록]
    - 관찰: ${observation}
    - 느낌: ${feeling}
    - 욕구: ${need}
    - 부탁: ${userRequest}
    
    위 기록을 바탕으로 코칭 가이드라인에 맞춰 3~4문장의 성찰 피드백을 한국어로 작성해주세요.
  `;

  try {
    // axios를 사용해 FriendliAI API를 호출
    const response = await axios.post(
      FRIENDLI_API_URL,
      {
        model: "skt/A.X-3.1",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${FRIENDLI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 응답에서 실제 피드백 텍스트를 추출
    const feedback = response.data.choices[0].message.content;

    // 결과 전송.
    return { feedback: feedback.trim() };
  } catch (err) {
    // 11. 에러가 발생한 경우
    console.error(
      "FriendliAI 코칭 실패:",
      err.response ? err.response.data : err.message
    );
    // 에러를 전송
    throw new functions.https.HttpsError("internal", "AI 코칭에 실패했습니다.");
  }
});
