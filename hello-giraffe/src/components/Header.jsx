// src/components/Header.jsx (SVG 로고 최종 버전)
import React from "react";
import { Link } from "react-router-dom";
// 👇 1. react-icons 대신, 우리가 추가한 SVG 파일을 import 합니다.
import GiraffeLogo from "../assets/giraffe-logo.svg";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        {/* 👇 2. 아이콘 컴포넌트 대신 <img> 태그를 사용합니다. */}
        <img src={GiraffeLogo} alt="Giraffe Logo" className="logo-icon" />
        <span className="logo-text">HelloGiraffe</span>
      </Link>
    </header>
  );
}

export default Header;
