import React from "react";
import "./Footer.scss";
import logo from "../../assets/logo.svg";
import vk from "../../assets/social/vk.svg";
import inst from "../../assets/social/instagram.svg";
import web from "../../assets/social/web-site.svg";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content_left">
          <img src={logo} alt={logo} />
        </div>
        <div className="footer__content_right">
          <div className="footer__content_right-social">
            <img src={vk} alt={vk} />
            <img src={inst} alt={inst} />
            <img src={web} alt={web} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
