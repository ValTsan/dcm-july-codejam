import React from "react";
import "./Footer.css";
import Logo from "/header-logo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <img src={Logo} alt="Daytrppr Logo" className="footer__logo" />

        <div className="footer__title"> Daytrippr &trade;</div>

        <div className="footer__team">
          Built by DCM Team Valerie, Jeel, Viktor and Steven
        </div>
      </div>
    </div>
  );
}

export default Footer;
