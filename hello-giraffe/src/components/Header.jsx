// src/components/Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import GiraffeLogo from "../assets/giraffe-logo.svg";

// Firebase 인증 관련 함수들 import
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// App.jsx로부터 user 정보를 props로 받음
function Header({ user }) {
  // Google 로그인 처리 함수
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // 구글 제공업체 객체 생성
    try {
      await signInWithPopup(auth, provider); // 팝업창으로 로그인
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase에서 로그아웃
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img src={GiraffeLogo} alt="Giraffe Logo" className="logo-icon" />
        <span className="logo-text">HelloGiraffe</span>
      </Link>

      {/* 로그인 상태에 따라 다른 UI를 보여주는 부분 */}
      <div className="auth-controls">
        {user ? (
          // 로그인이 된 경우
          <>
            <span className="user-display-name">
              {user.displayName}님 환영합니다!
            </span>
            <button onClick={handleLogout} className="button">
              로그아웃
            </button>
          </>
        ) : (
          // 로그인이 안 된 경우
          <button onClick={handleGoogleLogin} className="button button-primary">
            Google로 로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
