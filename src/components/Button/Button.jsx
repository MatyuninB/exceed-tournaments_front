import React from "react";
import "./Button.scss";
import { Link } from "react-router-dom";
const Button = ({ onClick, text, to, type, style }) => {
  return (
    <>
      {to ? (
        <Link style={style} to={to}>
          <button type={type} className="btn">
            {text}
          </button>
        </Link>
      ) : (
        <button style={style} onClick={onClick} type={type} className="btn">
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
