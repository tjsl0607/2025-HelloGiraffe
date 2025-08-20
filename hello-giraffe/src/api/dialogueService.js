// src/api/dialogueService.js

const DIALOGUES_KEY = "hello-giraffe-dialogues";

export const getDialogues = () => {
  const data = localStorage.getItem(DIALOGUES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveDialogue = (newDialogue) => {
  const dialogues = getDialogues();
  const updatedDialogues = [newDialogue, ...dialogues];
  localStorage.setItem(DIALOGUES_KEY, JSON.stringify(updatedDialogues));
  console.log("대화가 성공적으로 저장되었습니다:", updatedDialogues);
};

export const deleteDialogue = (id) => {
  // 1. 기존의 모든 기록을 가져옵니다.
  let dialogues = getDialogues();

  // 2. filter를 사용해, 삭제할 id와 일치하지 않는 기록들만 남깁니다.
  const updatedDialogues = dialogues.filter((dialogue) => dialogue.id !== id);

  // 3. 필터링된 새로운 목록을 로컬 스토리지에 덮어씁니다.
  localStorage.setItem(DIALOGUES_KEY, JSON.stringify(updatedDialogues));

  console.log(`${id} 기록이 삭제되었습니다.`);

  // 삭제 후 업데이트된 목록을 반환합니다.
  return updatedDialogues;
};
