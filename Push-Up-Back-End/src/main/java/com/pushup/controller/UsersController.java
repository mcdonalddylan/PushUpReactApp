package com.pushup.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pushup.model.Users;
import com.pushup.service.UsersService;

@CrossOrigin
@Controller
@RequestMapping("/users")
public class UsersController {

	@Autowired
	private UsersService userService;
	
	/**
	 * Creates a user based on the provided parameters.
	 * 
	 * @param email
	 * @param password
	 * @param firstName
	 * @param lastName
	 */
	@PostMapping("/create/{email}+{pass}+{fName}+{lName}")
	public @ResponseBody Users createUser(@PathVariable("email") String email, @PathVariable("pass") String password, 
			@PathVariable("fName") String firstName, @PathVariable("lName") String lastName)
	{
		Users newUser = new Users(0, email, password, firstName, lastName, false);
		
		return userService.createUser(newUser);
	}
	
	/**
	 * Retrieves information about a specific user based on the provided
	 *  email.
	 * 
	 * @param email
	 * @return ALL User information: id, email, encrypted password, first
	 *  name, last name, and boolean which states whether or not this user 
	 *  has verified their email.
	 */
	@PostMapping("/byEmail/{email}")
	public @ResponseBody Users findUserByEmail(@PathVariable("email") String email)
	{
		return userService.findUserByEmail(email);
	}
	
	/**
	 * Retrieves information about a specific user based on the provided
	 *  email and password. Essentially used to confirm whether the user
	 *  has provided the correct credentials or not.
	 * 
	 * @param email
	 * @return ALL User information: id, email, encrypted password, first
	 *  name, last name, and boolean which states whether or not this user has 
	 *  verified their email.
	 */
	@PostMapping("/login/{email}+{pass}")
	public @ResponseBody Users findUserByEmailAndPass(@PathVariable("email") String email, @PathVariable("pass") String password)
	{
		return userService.findUserByEmailAndPass(email, password);
	}
}
