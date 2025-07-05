import Button from "./Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar container pt-3 pb-3 align-items-start">
      <Link to={"/"} className="text-light navbar-brand">
        Stock Prediction Portal
      </Link>
      <div>
        <Button text="Login" url="/login" classList="btn btn-outline-info" />
        &nbsp;
        <Button text="Register" url="/register" classList="btn btn-info" />
      </div>
    </nav>
  );
};

export default Header;
