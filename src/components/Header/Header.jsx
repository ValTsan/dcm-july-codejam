import React from "react";
import { useState, useEffect } from "react";
import "./Header.css";
import Logo from "/header-logo.png";

const Header = ({ setModalType }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__nav-logo" src={Logo}></img>
        <button className="header__hamburger" onClick={toggleMenu}></button>

        <ul className={`header__nav ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="header__nav-list">
            <a href="#about" className="header__nav-link" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="header__nav-list">
            <a href="#trails" className="header__nav-link" onClick={toggleMenu}>
              Trails
            </a>
          </li>
          <li className="header__nav-list">
            <button
              type="button"
              className="header__nav-btn"
              onClick={() => {
                setModalType("login");
                toggleMenu();
              }}
            >
              Log In
            </button>
          </li>
          <li className="header__nav-list">
            <button
              type="button"
              className="header__signup-btn"
              onClick={() => {
                setModalType("signup");
                toggleMenu();
              }}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
      <h1 className="header__title">Best Summer Sightseeing Roadtrips</h1>
      <p className="header__subtitle">
        Discover the most picturesque landmarks and natural attractions
      </p>
    </header>
  );
};

export default Header;
