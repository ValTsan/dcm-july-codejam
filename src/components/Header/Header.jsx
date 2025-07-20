import "./Header.css";
import Logo from "../../../public/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__logo" src={Logo} alt="Logo" />
        <h1 className="header__title">Best Summer Sightseeing Roadtrips</h1>
        <nav className="header__desktop-nav">
          <ul className="header__nav-list"></ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
