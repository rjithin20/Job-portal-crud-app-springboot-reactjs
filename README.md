Job Portal Project
  This project is a full-stack web application built using Spring Boot and React.js with MySQL as the database. 
  The application allows users to sign up, sign in, view their profile details, and update all information except for their name.

Key Features:
  User Authentication: Sign up and log in functionality with secure password management.
  Dashboard: Displays user profile information.
  Profile Management: Allows users to update personal information (except for the name).


Steps to Run the Project

  Frontend:
    Navigate to the React.js project directory.
    Run npm install to install all dependencies.
    Run npm start to start the React application on http://localhost:3000.
    
  Backend:
    Navigate to the Spring Boot project directory.
    Change MySQL Username and Password in application.properties
    Ensure your MySQL database is running and accessible.
    Run mvn spring-boot:run to start the Spring Boot application.
    The backend will be available at http://localhost:8080.
    
  Database:
    Install MySQL and configure your database connection.
