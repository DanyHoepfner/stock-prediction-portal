import React from "react";

const Button = (props) => {
  return (
    <a href="#" className={props.classList}>
      {props.text}
    </a>
  );
};

export default Button;
