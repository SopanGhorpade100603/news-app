import React, { useState } from "react";
import Navbar from "./Navbar";
import News from "./News";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const Dashboard = ({ setIsLoggedIn }) => {
  const apiKey = process.env.REACT_APP_APIKEY_URL;
  const [progress, setProgress] = useState(0); // top loading bar
  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <LoadingBar
        height={4}
        waitingTime={1500}
        color="#f11946"
        progress={progress}
      />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/general" replace />}
        />
        <Route
          exact
          path="general"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="general"
              pageSize={6}
              category="general"
            />
          }
        />
        <Route
          exact
          path="business"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="business"
              pageSize={6}
              category="business"
            />
          }
        />
        <Route
          exact
          path="entertainment"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="entertainment"
              pageSize={6}
              category="entertainment"
            />
          }
        />
        <Route
          exact
          path="health"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="health"
              pageSize={6}
              category="health"
            />
          }
        />
        <Route
          exact
          path="science"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="science"
              pageSize={6}
              category="science"
            />
          }
        />
        <Route
          exact
          path="sport"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="sport"
              pageSize={6}
              category="sport"
            />
          }
        />
        <Route
          exact
          path="technology"
          element={
            <News
              apikey={apiKey}
              setProgress={setProgress}
              key="technology"
              pageSize={6}
              category="technology"
            />
          }
        />
      </Routes>
    </>
  );
};

export default Dashboard;
