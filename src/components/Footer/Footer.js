import React from "react";
import logogreen from "../../img/logo-green.png";

function Footer() {
  return (
    <div className="footer">
      <figure className="footer__logoContainer">
        <img src={logogreen} alt="logogreen" className="footer__logo" />
      </figure>
      <div className="footer__content">
        <div className="footer__content--right">
          <div className="footer__content__navigation">
            <ul className="list">
              <li className="list__item">about us</li>
              <li className="list__item">contanct</li>
              <li className="list__item">careers</li>
              <li className="list__item">bacome a guide</li>
              <li className="list__item">Download apps</li>
            </ul>
          </div>
        </div>
        <div className="footer__content--left">
          <div className="footer__content__paragraph">
            <p>
              Copyright © by MUHANNAD HAMMADA. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Voluptatibus laudantium magni
              provident nam saepe ipsam, eaque ut deleniti sint, maiores
              veritatis non iure reprehenderit. Aut ad itaque alias vel aliquam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
