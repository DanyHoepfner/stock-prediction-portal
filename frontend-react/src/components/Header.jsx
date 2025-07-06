import Button from "./Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar container pt-3 pb-3 align-items-start">
      <Link to={"/"} className="text-light navbar-brand">
        Stock Prediction Portal
      </Link>

      <div>
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Button
              text="Login"
              url="/login"
              classList="btn btn-outline-info"
            />
            &nbsp;
            <Button text="Register" url="/register" classList="btn btn-info" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
