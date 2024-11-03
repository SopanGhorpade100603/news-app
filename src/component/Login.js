import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrors] = useState({ username: "", password: "" });
  const [statusCodeMsg, setStatusCodeMsg] = useState("");
  const navigate = useNavigate();

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChnage = (event) => {
    setFormData((EnterData) => {
      return { ...EnterData, [event.target.name]: event.target.value };
    });
    setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const handleBlur = (event) => {
    // Check if the input field is empty
    if (!event.target.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: `Please enter your ${event.target.name}`, // Set an appropriate error message
      }));
    }
  };

  const sendDataToBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      console.log("data is *** ", data);
      if (data.statusCode === 200) {
        console.log("login Successful");
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else if (data.statusCode === 400) {
        console.log("invalid username or password");
        setStatusCodeMsg("invalid username or password");
      }
    } catch (error) {
      setStatusCodeMsg("Error: Could not connect to server");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("username ** ", formData.username);
    console.log("password ** ", formData.password);
    if (!formData.username || !formData.password) {
      if (!formData.username) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Please enter your username",
        }));
      }
      if (!formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Please enter your password",
        }));
      }
      return; // Prevent form submission if there are errors
    }
    sendDataToBackend();
    setFormData({ username: "", password: "" });
  };
  return (
    <>
      <div className="form-container">
        <form className="signupForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            id="username"
            name="username"
            onChange={handleChnage}
            onBlur={handleBlur}
          />
          {error.username && <div className="error">{error.username}</div>}

          <div className="password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between password and text
              placeholder="password"
              value={formData.password}
              id="password"
              name="password"
              onChange={handleChnage}
              onBlur={handleBlur}
            />
            <i
              className={`fa-regular ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={viewPassword}
            ></i>
            {error.password && <div className="error">{error.password}</div>}
            {statusCodeMsg && (
              <div className="status">
                <p>{statusCodeMsg}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!formData.username || !formData.password}
            onBlur={handleBlur}
          >
            Login
          </button>
        </form>
      </div>
      <h4 className="signup-prompt">
        If you are a new user?{" "}
        <NavLink to="/signup" className="signup-link">
          Signup now
        </NavLink>
      </h4>
    </>
  );
}
