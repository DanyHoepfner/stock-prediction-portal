import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetUserRegistrationFormData = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
  };

  const handleRegistration = async (e) => {
    setLoading(true);
    e.preventDefault();

    const userData = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      console.log("response.data ==>> ", response.data);
      console.log("Registration successful");
      setErrors({});
      setSuccess(true);
      resetUserRegistrationFormData();
    } catch (error) {
      setErrors(error.response.data);
      console.error("Registration error: ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded-3">
            <h3 className="text-light text-center mb-4">Create an Account</h3>
            <form onSubmit={handleRegistration}>
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
                <small>
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control mb-1"
                  placeholder="Enter email address"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
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
                <small>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>

              {success && (
                <div className="alert alert-success">
                  Registration Successful
                </div>
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
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
