package com.example.jobapp.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.jobapp.entity.User;
import com.example.jobapp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	//method for user registration
	public User registerUser(User user) {
		user.setPassword(user.getPassword());
		//set the delete flag to 0
		user.setDeleteFlag(0);
		//save the user in the db
		return userRepository.save(user);
	}
	
	//method for user registration
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public String saveProfileImage(MultipartFile file, String username) {
	    // Define the path to the uploads directory
	    String uploadDir = System.getProperty("user.dir") + "/uploads";

	    File directory = new File(uploadDir);
	    // Check if the directory exists, if not create it
	    if (!directory.exists()) {
	        directory.mkdirs();
	    }
	    if (file.isEmpty()) {
	        return null;
	    }

	    // Generate a unique filename based on the username
	    //String filename = username + "Image" + getFileExtension(file.getOriginalFilename());
	    
	    // filename with the username (without spaces) and current date
	    String usernameWithoutSpaces = username.replace(" ", ""); // Remove spaces from the username
	    String currentDate = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date()); // Get current date and time
	    String filename = usernameWithoutSpaces + "_" + currentDate + getFileExtension(file.getOriginalFilename());

	    try {
	        // Save the file to the uploads folder
	        File destinationFile = new File(directory, filename);
	        file.transferTo(destinationFile);
	        
	        // Define the base URL for accessing images
	        String baseUrl = "http://localhost:8080"; // Change this as needed for production
	        
	        // Return the complete URL to store in the database
	        return baseUrl + "/uploads/" + filename;
	    } catch (IOException e) {
	        throw new RuntimeException("Failed to store file " + filename, e);
	    }
	}

	    
    //for getting the file extension
    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf("."));
    }

	
	
	//method for user authentication
	public boolean authenticateUser(String email, String password) {
		User user = userRepository.findByEmail(email);
		if(user == null || user.getDeleteFlag() == 1) {
			return false; // user not found or account deleted
		}
		return password.equals(user.getPassword());
	}
	
	//return the details after successful login
	public User getUserDataByEmail(String email){
		 return userRepository.findByEmail(email);
	}
	
	public User getUserById(Long userId) {
	    return userRepository.findById(userId).orElse(null); // Return user if found, else null
	}

	
	//method for deleting user - soft deletion
	public boolean deleteUser(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if(user == null || user.getDeleteFlag() == 1) {
			return false; // user not found or account deleted
		}
		//update delete flag to 1
		user.setDeleteFlag(1); //delete the user
		userRepository.save(user);
		return true;
	}
	
	//method for fetching active users - delete flag = 0
	public List<User> getActiveUsers(){
		return userRepository.findByDeleteFlag(0);
	}

	
	// Update user details selectively without duplicating data
	public boolean updateUserDetails(Long userId, Map<String, Object> updates) {
	    // Fetch the existing user from the database
	    User user = userRepository.findById(userId).orElse(null);
	    
	    // If the user is not found or is marked as deleted, return false
	    if (user == null || user.getDeleteFlag() == 1) {
	        return false;
	    }
	    
	    // Update each field only if it is present in the updates map
	    updates.forEach((key, value) -> {
	        switch (key) {
	            case "dob":
	                user.setDob(LocalDate.parse((String) value));
	                break;
	            case "gender":
	                user.setGender((String) value);
	                break;
	            case "email":
	                user.setEmail((String) value);
	                break;
	            case "mobileNumber":
	                user.setMobileNumber((String) value);
	                break;
	            case "location":
	                user.setLocation((String) value);
	                break;
	            case "state":
	                user.setState((String) value);
	                break;
	            case "education":
	                user.setEducation((String) value);
	                break;
	            case "yearsOfExperience":
	            	if (value instanceof String) {
	                    user.setYearsOfExperience(Integer.parseInt((String) value));
	                } else if (value instanceof Integer) {
	                    user.setYearsOfExperience((Integer) value);
	                }
	                break;
	            case "applyingRole":
	                user.setApplyingRole((String) value);
	                break;
	            case "profilePicture":
	                user.setProfilePicture((String) value);
	                break;
	            default:
	                break;
	        }
	    });
	    
	    // Save the updated user entity back to the database
	    userRepository.save(user);
	    return true;
	}

}
