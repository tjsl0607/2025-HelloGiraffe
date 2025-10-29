// src/App.jsx

import React, { useState, useEffect } from "react"; // useState, useEffect 추가
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // 사용자 상태 변경 감지 함수
import { auth } from "./firebase"; // 방금 만든 auth 객체 import

import MainPage from "./pages/MainPage";
import DialoguePage from "./pages/DialoguePage";
import DialogueDetailPage from "./pages/DialogueDetailPage";
import Header from "./components/Header"; // Header import 추가
import BackgroundManager from "./components/BackgroundManager";

import "./index.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // 로그인한 사용자 정보 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // Firebase의 인증 상태 변경을 감지하는 옵저버 설정
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // 사용자가 있으면 정보가, 없으면 null이 저장됨
      setIsLoading(false); // 로딩 완료
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, []);

  // 로딩 중일 때는 아무것도 표시하지 않거나 로딩 스피너를 보여줌
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    // basename은 package.json의 homepage와 맞춰야 합니다.
    <BrowserRouter basename="/2025-HelloGiraffe">
      {/* Header에 user 정보를 props로 전달 */}
      <Header user={user} />
      <BackgroundManager />
      <Routes>
        {/* 각 페이지에 user 정보를 props로 전달 */}
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/new" element={<DialoguePage user={user} />} />
        <Route
          path="/dialogue/:id"
          element={<DialogueDetailPage user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
