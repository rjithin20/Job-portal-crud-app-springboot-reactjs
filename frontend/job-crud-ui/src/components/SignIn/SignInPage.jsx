import React, { useState } from "react";
import './SignInPage.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try{
      //make a POST request to the login endpoint
      const response = await axios.post("http://localhost:8080/users/login",{
        email, password
      });
      const userData = response.data; //storing the user data, if the login is success
      console.log(userData);
      
      if(response.status === 200){
        alert('Login successful!!!!!!!');
        setError("");
        navigate('/dashboard', { state: { userData } }); //redirect to the dashboard page after successful login 
        // and pass user data to Dashboard using the state prop
      }
    }catch (error){
      if (error.response && error.response.status === 400) {
        setError("Invalid Credentials");
      }else{
        setError("Something went wrong. Please try again later.")
      }
      console.error("An error occcured: ", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h2 className="signin-heading">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <Link to="/" className="home-button">Home</Link> {/* Navigate back to Home (Landing Page) */}
        {/* <Link className="forgot-button">Forgot Password</Link> */}
      </div>
    </div>
  );
}

export default SignInPage;
