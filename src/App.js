import "./App.css";
import React, { useState } from "react";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function ProtectedRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/dashboard/*"
          replace
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
