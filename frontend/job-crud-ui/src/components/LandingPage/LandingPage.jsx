import React from "react";
import "./LandingPage.css";
import {Link} from 'react-router-dom'; //for navigation

function LandingPage() {
  return (
    <div className="landing-container">
        <div className="landing-content">
            <h1 className="heading">Welcome to the Job Portal</h1>
            <p className="paragraph">
            Explore exciting career opportunities, apply for jobs, and take your career to the next level.
            </p>
            <div className="button-container">
                <Link to='/signin' className="button sign-in">Sign In</Link>
                <Link to='/signup' className="button sign-up">Sign Up</Link>
            </div>
        </div>
    </div>
  );
}

export default LandingPage;
