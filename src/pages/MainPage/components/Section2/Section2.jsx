import React from "react";
import "./Section2.scss";
import img1 from "./assets/1.png";
const Section2 = ({ content }) => {
  return (
    <div name="firstInsideContainer" className="section2">
      <img data-aos="zoom-in-right" src={img1} alt={img1} />
      <div data-aos="zoom-in-left" className="section2__info">
        <h2>
          {" "}
          <i>{"{"}</i>
          {content.title}
          <i>{"}"}</i>
        </h2>
        <p>{content.about}</p>
      </div>
    </div>
  );
};

export default Section2;
