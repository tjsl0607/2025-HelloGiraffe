// src/api/dialogueService.js

import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  where, // 'where' import 추가
  getDoc, // 'getDoc' import 추가
} from "firebase/firestore";

const dialoguesCollectionRef = collection(db, "dialogues");

// 내 대화 기록만 가져오기 (userId를 인자로 받음)
export const getDialogues = async (userId) => {
  // userId가 없으면 (로그인 안 했으면) 빈 배열 반환
  if (!userId) {
    return [];
  }

  // 'userId' 필드가 현재 로그인한 사용자의 id와 일치하는 문서만 가져오도록 쿼리 수정
  const q = query(
    dialoguesCollectionRef,
    where("userId", "==", userId), // 핵심 조건 추가!
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const dialogues = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dialogues;
};

// ID로 특정 대화 기록 하나만 가져오기
export const getDialogueById = async (id) => {
  const docRef = doc(db, "dialogues", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // 문서가 존재하지 않을 경우
    return null;
  }
};

// 새로운 대화 기록 저장하기 (userId를 인자로 받음)
export const saveDialogue = async (newDialogue, userId) => {
  const dialogueToSave = {
    ...newDialogue,
    userId: userId, //작성자의 uid를 함께 저장
    createdAt: Timestamp.now(),
  };
  // addDoc은 추가된 문서의 참조를 반환합니다.
  const docRef = await addDoc(dialoguesCollectionRef, dialogueToSave);
  return docRef; // 나중에 필요할 수 있으니 반환
};

// 특정 대화 기록 삭제하기
export const deleteDialogue = async (id) => {
  const dialogueDoc = doc(db, "dialogues", id);
  await deleteDoc(dialogueDoc);
};
