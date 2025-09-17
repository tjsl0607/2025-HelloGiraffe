// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DialoguePage from "./pages/DialoguePage";
import DialogueDetailPage from "./pages/DialogueDetailPage";
import BackgroundManager from "./components/BackgroundManager";

import "./index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/2025-HelloGiraffe">
      <BackgroundManager />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<DialoguePage />} />
        <Route path="/dialogue/:id" element={<DialogueDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
