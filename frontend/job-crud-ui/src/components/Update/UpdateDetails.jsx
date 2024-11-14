import "../SignUp/SignUpPage.css"; //using the same css used in signup
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(state?.userData || {});
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    if (state?.userData) {
      setUser(state.userData);
      setUpdatedUser(state.userData);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      profilePicture: e.target.files[0],
    }));
  };

  const handlePasswordChange = (e) => {
    // console.log(e.target.value);
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

  const handleSave = async () => {
    if (passwordMismatch) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id); // Pass the userId for update
    formData.append("name", updatedUser.name);
    formData.append("dob", updatedUser.dob);
    formData.append("gender", updatedUser.gender);
    formData.append("email", updatedUser.email);
    formData.append("mobileNumber", updatedUser.mobileNumber);
    formData.append("location", updatedUser.location);
    formData.append("state", updatedUser.state);
    formData.append("education", updatedUser.education);
    formData.append("yearsOfExperience", updatedUser.yearsOfExperience);
    formData.append("applyingRole", updatedUser.applyingRole);
    formData.append("password", password);
    if (updatedUser.profilePicture) {
      formData.append("profilePicture", updatedUser.profilePicture);
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/users/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Success: Update the dashboard with the updated user data
        alert("User details updated successfully!");
        navigate("/dashboard", { state: { userData: response.data } });
      } else {
        alert(`Failed to update user: ${response.data}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating details. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="content">
      <h2 className="heading">Edit Your Details</h2>

      <form>
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={updatedUser.name} disabled />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={updatedUser.dob || ""}
              onChange={handleInputChange}
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
                  name="gender"
                  value="Male"
                  checked={updatedUser.gender === "Male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={updatedUser.gender === "Female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={updatedUser.gender === "Other"}
                  onChange={handleInputChange}
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
              name="email"
              value={updatedUser.email || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={updatedUser.mobileNumber || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={updatedUser.location || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={updatedUser.state || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="education">Education:</label>
            <select
              id="education"
              name="education"
              value={updatedUser.education || ""}
              onChange={handleInputChange}
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
              name="yearsOfExperience"
              value={updatedUser.yearsOfExperience || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="applyingRole">Applying Role:</label>
            <input
              type="text"
              id="applyingRole"
              name="applyingRole"
              value={updatedUser.applyingRole || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" id="profilePicture" onChange={handleFileChange} />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password (optional)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {passwordMismatch && (
          <div className="error-message">Passwords do not match</div>
        )}

        <button type="button" onClick={handleSave} className="button">
          Save Changes
        </button>
      </form>
      </div>
    </div>
  );
};

export default UpdateDetails;
