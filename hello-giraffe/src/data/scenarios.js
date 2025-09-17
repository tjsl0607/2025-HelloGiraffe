// src/data/scenarios.js
import { BsClockHistory, BsMoonStars } from "react-icons/bs";

export const scenarios = {
  latePromise: {
    id: "latePromise",
    title: "친구가 약속에 늦었을 때",
    icon: BsClockHistory, // '늦은 친구'를 위한 아이콘
    steps: [
      {
        phase: "관찰",
        guide:
          "어떤 일이 있었나요? '또 늦었어' 같은 판단 대신, 카메라로 찍듯 객관적인 사실을 적어보세요.",
        placeholder: "예: 오늘 약속 시간인 2시보다 30분 늦게 도착한 것을 봤어.",
      },
      {
        phase: "느낌",
        guide:
          "그 상황에서 어떤 감정이 들었나요? '화났어'보다 더 구체적인 내 솔직한 감정을 표현해보세요.",
        placeholder:
          "예: 기다리는 동안 초조했고, 내 시간이 존중받지 못하는 것 같아 서운했어.",
      },
      {
        phase: "욕구",
        guide:
          "어떤 마음이 충족되길 바랐나요? 내 안의 중요한 가치(욕구)를 찾아보세요.",
        placeholder:
          "예: 나는 우리의 만남과 약속이 소중하게 여겨지길 바라고, 서로에 대한 존중이 중요해.",
      },
      {
        phase: "부탁",
        guide:
          "상대방이 무엇을 해주길 바라나요? '앞으로 잘해' 같은 막연한 말 대신, 구체적이고 긍정적인 행동을 부탁해보세요.",
        placeholder:
          "예: 혹시 앞으로 늦을 것 같으면 예상 도착 시간을 미리 알려줄 수 있을까?",
      },
    ],
  },
  sleepHabit: {
    id: "sleepHabit",
    title: "엄마와 수면 습관 문제로 다툴 때",
    icon: BsMoonStars, // '수면 습관'을 위한 아이콘
    steps: [
      {
        phase: "관찰",
        guide: "어젯밤, 어떤 일이 있었는지 판단 없이 사실만 말해보세요.",
        placeholder:
          "예: 어제 새벽 2시에 '아직도 안 자고 뭐하니'라고 말씀하셨을 때, 저는 핸드폰을 보고 있었어요.",
      },
      {
        phase: "느낌",
        guide:
          "그 말을 들었을 때 어떤 감정이 들었나요? '짜증났다'를 넘어 더 깊은 감정을 찾아보세요.",
        placeholder:
          "예: 제 생활을 통제받는 것 같아 답답했고, 존중받지 못하는 기분에 서운했어요.",
      },
      {
        phase: "욕구",
        guide:
          "그 순간, 어떤 마음이 충족되길 바랐나요? 어떤 중요한 가치가 있었나요?",
        placeholder:
          "예: 저는 제 스스로 생활 패턴을 조절할 수 있다는 믿음과 자율성을 존중받고 싶었어요.",
      },
      {
        phase: "부탁",
        guide:
          "엄마가 어떻게 해주시길 바라나요? 구체적이고 긍정적인 행동으로 부탁해보세요.",
        placeholder:
          "예: 앞으로는 잠 자는 문제로 걱정되실 때, '몇 시쯤 잘 거니?'라고 먼저 제 계획을 물어봐 주실 수 있을까요?",
      },
    ],
  },
};
