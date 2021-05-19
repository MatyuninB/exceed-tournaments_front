import React from "react";
import "./Section4.scss";
const Section4 = ({ content }) => {
  return (
    <div data-aos="slide-up" className="section4">
      <div className="section4__info">
        <h2 data-aos="flip-up">
          <i>{"{"}</i>
          Сriteria<i>{"}"}</i>
        </h2>
        <div  className="rules">
          {content.rules &&
            content.benchmarks.map((item, index) => (
              <p>
                <i style={{ fontWeight: "bold" }}>{"// "} </i>
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Section4;
