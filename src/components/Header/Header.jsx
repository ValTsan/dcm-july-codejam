import "./Header.css";
import Logo from "../../../public/header-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__nav-logo" src={Logo}></img>
        <ul className="header__nav">
          <li className="header__nav-list">About</li>
          {/* separate pages for about and trails, trails can be a dead link if needed */}
          <li className="header__nav-list">Trails</li>
          <li className="header__nav-list">Log In</li>
          {/* implementing a modal pop up for both log in and sign up */}
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
