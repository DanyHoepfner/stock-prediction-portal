import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.url} className={props.classList}>
      {props.text}
    </Link>
  );
};

export default Button;
