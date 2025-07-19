import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navbar">
        <img className="header__logo"></img>
        <h1 className="header__title">Best Summer Sightseeing Roadtrip</h1>
        <nav className="header__desktop-nav">
          <ul className="header__nav-list"></ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
