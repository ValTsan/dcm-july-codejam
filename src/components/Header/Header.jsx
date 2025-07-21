import "./Header.css";
import Logo from "../../../public/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navbar">
        <ul className="header__nav">
          <li className="header__nav-list">About</li>
          <li className="header__nav-list">Trails</li>
          <li className="header__nav-list">Log In</li>
          <li className="header__nav-list">Sign Up</li>
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
