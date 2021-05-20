import React from "react";
import "./Section3.scss";
import img2 from "./assets/2.png";
const Section3 = ({ content }) => {
  return (
    <div className="section3">
      <div data-aos="fade-up" className="section3__info">
        <h2>
          <i>{"{"}</i>
          Rules<i>{"}"}</i>
        </h2>
        <div className="rules">
          {content.rules &&
            content.rules.map((item, index) => (
              <p key={`rule${index}`}>
                <i style={{ fontWeight: "bold" }}>{'// '} </i>
                {item}
              </p>
            ))}
        </div>
      </div>
      <img data-aos="fade-right" src={img2} alt={img2} />
    </div>
  );
};

export default Section3;
