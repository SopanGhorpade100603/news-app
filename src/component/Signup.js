import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Signup() {
  const [formData, setformData] = useState({
    fName: "",
    lName: "",
    userName: "",
    password: "",
    confPassword: "",
    mobileNumber: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [statusCode, setStatusCode] = useState("");

  const handleInputChange = (event) => {
    setformData((userEnterData) => {
      return { ...userEnterData, [event.target.name]: event.target.value };
    });
    setError((prevErrors) => ({ ...prevErrors, [event.target.name]: "" }));
  };

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };
  const viewConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const sendDataToBackend = async () => {
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const Code = await response.json(); // to display ui response
    console.log("data is *** ", Code);
    if (Code.statusCode === 200) {
      setStatusCode("signup successful!");
    } else {
      setStatusCode("unable to store data");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confPassword) {
      setError((prevErrors) => ({
        ...prevErrors,
        confPassword: "Password does not match",
      }));
      return;
    }
    console.log(
      "fName ** ",
      formData.fName,
      " lName ** ",
      formData.lName,
      " userName ** ",
      formData.userName,
      " password ** ",
      formData.password,
      " confirmPasswrod ** ",
      formData.confPassword,
      "mobileNumber ** ",
      formData.mobileNumber
    );
    sendDataToBackend();
    setformData({
      fName: "",
      lName: "",
      userName: "",
      password: "",
      confPassword: "",
      mobileNumber: "",
      statusCode: "",
    });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="signupForm">
          <label htmlFor="fName">Enter your firstname </label>
          <input
            type="text"
            placeholder="Enter your firstname "
            id="fName"
            value={formData.fName}
            name="fName"
            onChange={handleInputChange}
          />

          <label htmlFor="lName">Enter your lastname </label>
          <input
            type="text"
            placeholder="Enter your lastname "
            id="lName"
            value={formData.lName}
            name="lName"
            onChange={handleInputChange}
          />

          <label htmlFor="userName">Enter your username </label>
          <input
            type="text"
            placeholder="Enter your username "
            id="userName"
            value={formData.userName}
            name="userName"
            onChange={handleInputChange}
            required
          />

          <div className="password-wrapper">
            <label htmlFor="password">Enter password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password "
              id="password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
            />
            <i
              className={`fa-regular ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={viewPassword}
            ></i>
          </div>

          <div className="password-wrapper">
            <label htmlFor="confPassword">Enter confirm password</label>
            <input
              type={showConfPassword ? "text" : "password"}
              placeholder="Enter confirm password "
              id="confPassword"
              value={formData.confPassword}
              name="confPassword"
              onChange={handleInputChange}
            />
            <i
              className={`fa-regular ${
                showConfPassword ? "fa-eye-slash" : "fa-eye"
              }`}
              onClick={viewConfPassword}
            ></i>
            {error.confPassword && (
              <div className="error">{error.confPassword}</div>
            )}
          </div>

          <label htmlFor="mobileNumber">Enter mobile number</label>
          <input
            type="number"
            placeholder="Enter mobile number"
            id="mobileNumber"
            value={formData.mobileNumber}
            name="mobileNumber"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={
              !formData.userName || !formData.password || !formData.confPassword
            }
          >
            SignUp
          </button>
          {error.loginError && (
            <div className="error signup-error">{error.loginError}</div>
          )}
          {statusCode && (
            <div className="status">
              <p>{statusCode}</p>
            </div>
          )}
        </form>
      </div>
      <h4 className="login-prompt">
        If you are allreadyRegister?{" "}
        <NavLink to="/" className="login-link" replace>
          login now
        </NavLink>
      </h4>
    </>
  );
}
