import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
  const { state } = useLocation(); // Get state passed from signin
  const navigate = useNavigate();

  // Initialize user data from location state
  const [user, setUser] = useState({
    id : '',
    name: '',
    dob: '',
    gender: '',
    email: '',
    mobileNumber: '',
    location: '',
    state: '',
    education: '',
    yearsOfExperience: '',
    applyingRole: '',
    profilePicture: ''
  });
  // console.log(user.profilePicture);
  
  useEffect(() => {
    // If state has user data, update state
    if (state?.userData) {
      setUser(state.userData);
    }
  }, [state]);

  // Logout handler - redirects to the home page
  const handleLogout = () => {
    // localStorage.removeItem('user');  // Remove user data from localStorage
    navigate('/');
  };

  // Edit Details handler - redirects to UpdateDetails component
  const handleEdit = () => {
    navigate('/update', { state: { userData: user } });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">User Dashboard</h2>

      <div className="user-info">
        <div className="profile-section">
          {/* Displaying profile picture */}
          <img
            src={user.profilePicture ? user.profilePicture : '/default-avatar.png'}
            // src={user.profilePicture ? `C:\SpringBoot-learn\JobApp\${user.profilePicture}` : '/default-avatar.png'}
            alt="Profile"
            className="profile-image"
          />

          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>User Id:</strong> {user.id}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Education:</strong> {user.education}</p>
            <p><strong>Years of Experience:</strong> {user.yearsOfExperience}</p>
            <p><strong>Applying Role:</strong> {user.applyingRole}</p>
          </div>

          {/* Buttons */}
          <button onClick={handleEdit} className="edit-button">
            Edit Details
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
