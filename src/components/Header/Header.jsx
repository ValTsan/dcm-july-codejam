import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__logo"></img>
        <ul className="header__nav">
          <li className="header__nav-list">Memberships</li>
          <li className="header__nav-list">Trails</li>
          <li className="header__nav-list">Login</li>
          <li className="header__nav-list">Sign Up</li>
        </ul>
        <h1 className="header__title">Best Summer Sightseeing Roadtrip</h1>
      </div>
    </header>
  );
};

export default Header;
