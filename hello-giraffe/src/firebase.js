// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 본인의 Firebase 프로젝트 설정 코드를 붙여넣는 곳입니다.
const firebaseConfig = {
  apiKey: "AIzaSy...YOUR_API_KEY",
  authDomain: "hello-giraffe-app.firebaseapp.com",
  projectId: "hello-giraffe-app",
  storageBucket: "hello-giraffe-app.appspot.com",
  messagingSenderId: "...",
  appId: "1:...",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스를 초기화하고 export 합니다.
// 이 줄이 dialogueService.js에서 db를 import할 수 있게 해줍니다.
export const db = getFirestore(app);
