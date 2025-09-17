// src/api/dialogueService.js (Firebase 버전)

import { db } from "../firebase"; // 1. firebase.js에서 db 인스턴스 가져오기
import {
  collection, // 'dialogues' 컬렉션에 접근하기 위해
  query, // 쿼리를 만들기 위해
  orderBy, // 데이터를 정렬하기 위해
  getDocs, // 문서들을 가져오기 위해
  addDoc, // 문서를 추가하기 위해
  deleteDoc, // 문서를 삭제하기 위해
  doc, // 특정 문서에 접근하기 위해
  Timestamp, // 서버 시간을 저장하기 위해
} from "firebase/firestore";

// 'dialogues' 라는 이름의 컬렉션을 참조하는 객체를 만듭니다.
const dialoguesCollectionRef = collection(db, "dialogues");

// 🔥 [변경] 모든 함수를 async로 변경합니다.

// 전체 대화 기록 가져오기
export const getDialogues = async () => {
  // createdAt 필드를 기준으로 내림차순(최신순)으로 정렬하는 쿼리를 만듭니다.
  const q = query(dialoguesCollectionRef, orderBy("createdAt", "desc"));

  // 쿼리를 실행하여 스냅샷(결과 데이터)을 가져옵니다.
  const querySnapshot = await getDocs(q);

  // 스냅샷의 각 문서를 순회하며 필요한 데이터만 추출하여 배열로 만듭니다.
  // Firestore는 문서 데이터와 별개로 고유 ID를 가지고 있습니다.
  const dialogues = querySnapshot.docs.map((doc) => ({
    id: doc.id, // Firestore가 자동으로 생성해준 고유 문서 ID
    ...doc.data(), // 문서에 저장된 나머지 데이터
  }));

  return dialogues;
};

// 새로운 대화 기록 저장하기
export const saveDialogue = async (newDialogue) => {
  // Firestore는 Date 객체보다 자체 Timestamp 타입을 사용하는 것이 좋습니다.
  // id는 Firestore가 자동으로 만들어주므로 여기서는 제거합니다.
  const dialogueToSave = {
    scenarioTitle: newDialogue.scenarioTitle,
    steps: newDialogue.steps,
    createdAt: Timestamp.now(), // 현재 서버 시간을 저장
  };

  // 'dialogues' 컬렉션에 새로운 문서를 추가합니다.
  const docRef = await addDoc(dialoguesCollectionRef, dialogueToSave);
  console.log("새로운 문서가 다음 ID로 추가되었습니다:", docRef.id);
};

// 특정 대화 기록 삭제하기
export const deleteDialogue = async (id) => {
  // 삭제할 문서에 대한 참조를 만듭니다.
  const dialogueDocRef = doc(db, "dialogues", id);

  // 해당 문서를 삭제합니다.
  await deleteDoc(dialogueDocRef);
  console.log(`${id} ID를 가진 문서가 삭제되었습니다.`);
};
