import React, { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [education, setEducation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [applyingRole, setApplyingRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false); // To track password mismatch
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (passwordMismatch) {
      alert("Passwords didn’t match, buddy! Time to take it from the top and give it another shot.")
      return;
    }
    e.preventDefault();
    if (
      !name ||
      !dob ||
      !gender ||
      !email ||
      !mobileNumber ||
      !location ||
      !state ||
      !education ||
      !yearsOfExperience ||
      !applyingRole ||
      !password
    ) {
      setError("Please fill in all the fields");
      return;
    }
    if (!profilePicture) {
      setError("Please add a profile picture");
      return;
    }

    //handle form submission and send data to backend
    const formData = new FormData(); //construct a set of key/value pairs representing form fields and their values
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("mobileNumber", mobileNumber);
    formData.append("location", location);
    formData.append("state", state);
    formData.append("education", education);
    formData.append("yearsOfExperience", yearsOfExperience);
    formData.append("applyingRole", applyingRole);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);

    // send the form data to the backend
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Registration successful");
      navigate("/signin"); //navigate to the sign in page
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  // functions to check if passwords match
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="heading">Sign Up</h2>
        <form>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter you full name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={gender === "Other"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Other
                </label>
              </div>
            </div>

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
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your City or District"
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="education">Education:</label>
              <select
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              >
                <option value="">Select Education Level</option>
                <option value="PG">Postgraduate</option>
                <option value="UG">Undergraduate</option>
                <option value="Diploma">Diploma</option>
                <option value="High School">High School</option>
              </select>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="yearsOfExperience">Years of Experience:</label>
              <input
                type="number"
                id="yearsOfExperience"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                placeholder="Total experience"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="applyingRole">Applying Role:</label>
              <input
                type="text"
                id="applyingRole"
                value={applyingRole}
                onChange={(e) => setApplyingRole(e.target.value)}
                placeholder="Enter role you're applying for"
                required
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*" // Restrict to image files
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Show password mismatch error */}
          {passwordMismatch && (
            <div className="error-message">Enter the same password</div>
          )}

          {error && <div className="error-message">{error}</div>}
          <button type="submit" onClick={handleSubmit} className="button">
            Register
          </button>
        </form>
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
