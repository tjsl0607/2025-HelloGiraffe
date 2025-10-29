// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 본인의 Firebase 프로젝트 설정 코드를 붙여넣는 곳입니다.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIDEb9iYJbNAmgOX7Q1g-vG7LXPChv8ro",
  authDomain: "hello-giraffe-app.firebaseapp.com",
  projectId: "hello-giraffe-app",
  storageBucket: "hello-giraffe-app.firebasestorage.app",
  messagingSenderId: "552653100939",
  appId: "1:552653100939:web:48629d91d7a28b4a20818e",
  measurementId: "G-R9EB0J1DXT",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스를 초기화하고 export 합니다.
// 이 줄이 dialogueService.js에서 db를 import할 수 있게 해줍니다.
export const db = getFirestore(app);

export const auth = getAuth(app);
