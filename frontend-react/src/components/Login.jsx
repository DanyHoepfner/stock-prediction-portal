import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import axiosInstance from "../axiosInstance";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const userData = { username: userName, password: userPassword };
    console.log("User Data ==> ", userData);

    try {
      const response = await axiosInstance.post("/token/", userData);
      console.log(response);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setIsLoggedIn(true);
      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login error: ", error.response.data);
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded-3">
            <h3 className="text-light text-center mb-4">Login to Portal</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control mb-1"
                  placeholder="Set password"
                  value={userPassword}
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                />
              </div>

              {errors && (
                <div className="text-danger mb-3">{errors.detail}</div>
              )}

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto"
                  disabled
                >
                  Please wait...
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
