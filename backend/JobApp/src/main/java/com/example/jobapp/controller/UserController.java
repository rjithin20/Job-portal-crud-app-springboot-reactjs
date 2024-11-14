package com.example.jobapp.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.jobapp.entity.User;
import com.example.jobapp.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")  // Only allow request from this origin
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	//registration endpoint
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(
	    @RequestParam("name") String name,
	    @RequestParam("dob") LocalDate dob,
	    @RequestParam("gender") String gender,
	    @RequestParam("email") String email,
	    @RequestParam("mobileNumber") String mobileNumber,
	    @RequestParam("location") String location,
	    @RequestParam("state") String state,
	    @RequestParam("education") String education,
	    @RequestParam("yearsOfExperience") int yearsOfExperience,
	    @RequestParam("applyingRole") String applyingRole,
	    @RequestParam("password") String password,
	    @RequestParam("profilePicture") MultipartFile profilePicture // Handling the image file
			) {
		String profileImage = userService.saveProfileImage(profilePicture, name);
	    
	    User user = new User();
	    user.setName(name);
	    user.setDob(dob);
	    user.setGender(gender);
	    user.setEmail(email);
	    user.setMobileNumber(mobileNumber);
	    user.setLocation(location);
	    user.setState(state);
	    user.setEducation(education);
	    user.setYearsOfExperience(yearsOfExperience);
	    user.setApplyingRole(applyingRole);
	    user.setPassword(password);
	    user.setProfilePicture(profileImage);
	    
	    // Handle the user registration as needed
	    User registeredUser = userService.registerUser(user);
	    return ResponseEntity.ok(registeredUser);
	}

	//user authentication endpoint
	@PostMapping("/login")
	public ResponseEntity<User> authenticateUser(@RequestBody Map<String, String> credentials){
	    String email = credentials.get("email");
	    String password = credentials.get("password");

	    boolean isAuthenticated = userService.authenticateUser(email, password);
	    if(isAuthenticated) {
	    	User retrivedUser = userService.getUserDataByEmail(email);
	        return ResponseEntity.ok(retrivedUser);
	    } else {
	    	return ResponseEntity.status(401).body(null);
	    }
	}
	
	// user deleting endpoint - not implemented in ui
	@DeleteMapping("/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Long userId){
		boolean isDeleted = userService.deleteUser(userId);
		if(isDeleted) {
			return ResponseEntity.ok("User account deleted successfully");
		}else {
			return ResponseEntity.status(404).body("User not found or already deleted");
		}
	}
	
	// endpoint for fetching active users
	@GetMapping("/active")
	public ResponseEntity<List<User>> getActiveUsers(){
		List<User> activeUsers = userService.getActiveUsers();
		return ResponseEntity.ok(activeUsers);
	}

	@PostMapping("/update")
	public ResponseEntity<User> updateUser(
	    @RequestParam("userId") Long userId,
	    @RequestParam("name") String name,
	    @RequestParam("dob") LocalDate dob,
	    @RequestParam("gender") String gender,
	    @RequestParam("email") String email,
	    @RequestParam("mobileNumber") String mobileNumber,
	    @RequestParam("location") String location,
	    @RequestParam("state") String state,
	    @RequestParam("education") String education,
	    @RequestParam("yearsOfExperience") int yearsOfExperience,
	    @RequestParam("applyingRole") String applyingRole,
	    @RequestParam("password") String password,
	    @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture
	) {
	    // Fetch the existing user from the database
	    User existingUser = userService.getUserById(userId); // Method to retrieve user by ID
	    
	    if (existingUser == null) {
	        return ResponseEntity.status(404).body(null);  // Return 404 if user not found
	    }

	    // If a new profile picture is uploaded, process it
	    String profileImage = null;
	    if (profilePicture != null && !profilePicture.isEmpty()) {
	        profileImage = userService.saveProfileImage(profilePicture, name);
	    }

	    // Update the user's fields
	    existingUser.setDob(dob);
	    existingUser.setGender(gender);
	    existingUser.setEmail(email);
	    existingUser.setMobileNumber(mobileNumber);
	    existingUser.setLocation(location);
	    existingUser.setState(state);
	    existingUser.setEducation(education);
	    existingUser.setYearsOfExperience(yearsOfExperience);
	    existingUser.setApplyingRole(applyingRole);
	    // Only update the password if it is provided
	    if (password != null && !password.trim().isEmpty()) {
	    	System.out.println(password);
	        existingUser.setPassword(password);
	    }

	    if (profileImage != null) {
	        existingUser.setProfilePicture(profileImage);
	    }

	    // Save the updated user details to the database
	    userService.saveUser(existingUser);

	    // Return the updated user object
	    return ResponseEntity.ok(existingUser);
	}



}
