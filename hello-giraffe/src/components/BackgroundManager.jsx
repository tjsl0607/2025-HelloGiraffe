// src/components/BackgroundManager.jsx (새 파일)

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function BackgroundManager() {
  const location = useLocation();

  useEffect(() => {
    // 현재 경로가 메인 페이지('/')일 경우
    if (location.pathname === "/") {
      document.body.className = "main-page-bg";
    } else {
      // 그 외 모든 페이지일 경우
      document.body.className = "secondary-page-bg";
    }
  }, [location]); // URL이 변경될 때마다 이 코드가 다시 실행됩니다.

  return null; // 이 컴포넌트는 화면에 아무것도 그리지 않습니다.
}

export default BackgroundManager;
