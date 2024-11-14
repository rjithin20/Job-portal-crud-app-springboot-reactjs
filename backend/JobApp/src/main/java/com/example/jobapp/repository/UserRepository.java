package com.example.jobapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.jobapp.entity.User;

//extends JpaRepository - provide basic CRUD operations
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	//custom methods
	//find a user by email
	User findByEmail(String email);
	//find users based on their deleteFlag
	List<User> findByDeleteFlag(int deleteFlag);
}
