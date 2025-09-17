import React from "react";
import { Link } from "react-router-dom";
import GiraffeLogo from "../assets/giraffe-logo.svg";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <img src={GiraffeLogo} alt="Giraffe Logo" className="logo-icon" />
        <span className="logo-text">HelloGiraffe</span>
      </Link>
    </header>
  );
}

export default Header;
