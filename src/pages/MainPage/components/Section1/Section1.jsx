import React from "react";
import "./Section1.scss";
import { Link } from "react-scroll";
import arrow from "../../../../assets/arrow.png";
const Section1 = () => {
  return (
    <div className="section1">
      <span data-aos="slide-up" data-aos-delay="1000">
        Welcome to the
      </span>
      <h2 data-aos="zoom-in" data-aos-delay="1000">
        <span data-aos="zoom-in" data-aos-delay="1000">
          E
        </span>
        xceed team
      </h2>
      <span data-aos="slide-down" data-aos-delay="1000">
        TOURNAMENT
      </span>
      <Link
        data-aos="flip-up"
        spy={true}
        smooth={true}
        to="firstInsideContainer"
      >
        <img src={arrow} alt={arrow} />
      </Link>
    </div>
  );
};

export default Section1;
