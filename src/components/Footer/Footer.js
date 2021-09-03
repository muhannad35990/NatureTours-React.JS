import React from "react";
import { useTranslation } from "react-i18next";
import logogreen from "../../img/logo-green.png";

function Footer({ expanded }) {
  const { t } = useTranslation("words");

  return (
    <div className={`footer ${expanded && "extendedFooter"}`}>
      <figure className="footer__logoContainer">
        <img src={logogreen} alt="logogreen" className="footer__logo" />
      </figure>
      <div className="footer__content">
        <div className="footer__content--right">
          <div className="footer__content__navigation">
            <ul className="list">
              <li className="list__item">{t("about_us")}</li>
              <li className="list__item">{t("contanct")}</li>
              <li className="list__item">{t("careers")}</li>
              <li className="list__item">{t("bacome_guide")}</li>
            </ul>
          </div>
        </div>
        <div className="footer__content--left">
          <div className="footer__content__paragraph">
            <p>
              Copyright © by MUHANNAD HAMMADA. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
