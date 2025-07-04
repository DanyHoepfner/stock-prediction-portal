import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <nav className="navbar container pt-3 pb-3 align-items-start">
      <a href="" className="text-light navbar-brand">
        Stock Prediction Portal
      </a>
      <div>
        <Button text="Login" classList="btn btn-outline-info" />
        &nbsp;
        <Button text="Register" classList="btn btn-info" />
      </div>
    </nav>
  );
};

export default Header;
