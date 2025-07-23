import React from "react";
import "./Footer.css";
import Logo from "/header-logo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <img src={Logo} alt="Daytrppr Logo" className="footer__logo" />
        <span className="footer__title">Daytrippr&trade;</span>
      </div>

      <div className="footer__center">
        Best Summer Sightseeing Roadtrip&trade;
      </div>

      <div className="footer__right">
        Built by DCM Team Valerie, Jeel, Viktor and Steven
      </div>
    </div>
  );
}

export default Footer;
