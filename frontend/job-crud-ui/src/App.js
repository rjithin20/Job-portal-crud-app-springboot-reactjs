import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import SignInPage from "./components/SignIn/SignInPage";
import './App.css';
import SignUpPage from "./components/SignUp/SignUpPage";
import Dashboard from "./components/Dashboard/Dashboard";
import UpdateDetails from "./components/Update/UpdateDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* need to protect the below routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update" element={<UpdateDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
