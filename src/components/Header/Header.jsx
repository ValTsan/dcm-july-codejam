import React from "react";
import "./Header.css";
import Logo from "../../../public/header-logo.png";

const Header = ({ setModalType }) => {
  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__nav-logo" src={Logo}></img>
        <ul className="header__nav">
          <li className="header__nav-list">
            <a href="#about" className="header__nav-link">
              About
            </a>
          </li>
          <li className="header__nav-list">
            <a href="#trails" className="header__nav-link">
              Trails
            </a>
          </li>
          <li className="header__nav-list">
            <button
              type="button"
              className="header__nav-btn"
              onClick={() => setModalType("login")}
            >
              Log In
            </button>
          </li>
          <li className="header__nav-list">
            <button
              type="button"
              className="header__signup-btn"
              onClick={() => setModalType("signup")}
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
