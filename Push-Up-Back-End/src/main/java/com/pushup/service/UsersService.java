package com.pushup.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pushup.model.Users;
import com.pushup.model.Verify;
import com.pushup.repo.UsersRepo;
import com.pushup.repo.VerifyRepo;
import com.pushup.util.EmailUtil;

@Service(value="userService")
public class UsersService {
	
	@Autowired
	private UsersRepo userRepo;
	
	@Autowired
	private VerifyRepo verRepo;
	
	public Users createUser(Users newUser)
	{
		try
		{
			userRepo.save(newUser);
			
			//creating the new verify object
			Random rand = new Random();
			int code = rand.nextInt(1000000000) + rand.nextInt(1000000000);
			Verify newVer = new Verify(code, newUser.getEmail(), false);
			verRepo.save(newVer);
			
			EmailUtil.sendMail(newUser.getEmail(), "Welcome to the Push Up App!", 
		       		"Please click this link to validate your account: "
		       		+ "<a href=\"http://localhost:2020/verify/"+code+"\">http://localhost:2020/verify/"+code+"</a>.");
			
			return newUser;
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}
	
	public Users findUserByEmail(String email)
	{
		return userRepo.findByEmail(email);
	}
	
	public Users findUserByEmailAndPass(String email, String password)
	{
		//hashing the password algorithm
        String newPass="";
        try {
            
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashPass = md.digest(password.getBytes());
            newPass = hexString(hashPass);
            
            //System.out.println("java hash of ye: " + newPass);
            
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        
		return userRepo.findByEmailAndPassword(email, newPass);
	}
	
	public Boolean changePassword(String email, String newPass)
	{
		try {
			userRepo.setPasswordForUsers(newPass, email);
			return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public Boolean changeFirstName(String email, String newName)
	{
		try {
			userRepo.setFirstNameForUsers(newName, email);
			return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public Boolean changeLastName(String email, String newName)
	{
		try {
			userRepo.setLastNameForUsers(newName, email);
			return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}
	
	public Boolean newTempPassword(String email)
	{
		try {
			Random rand = new Random();
			int tempPass = rand.nextInt(100000);
			
			userRepo.setPasswordForUsers(String.valueOf(tempPass), email);
			
			EmailUtil.sendMail(email, "New temporary password", 
		       		"Your new temporary password is: " + tempPass);
			
			return true;
		}catch(Exception e)
		{
			e.printStackTrace();
			return false;
		}
	}
	
	//------------------------------------------------------------------------------------------------
	//function found at: https://stackoverflow.com/questions/1033947/mysql-md5-and-java-md5-not-equal
	//meant to encode the hashed password into base 16 to match the password in the db.
	public String hexString( byte[] bytes ) 
	{
		StringBuffer sb = new StringBuffer();
		for( int i=0; i<bytes.length; i++ )     
		{
			byte b = bytes[ i ];
			String hex = Integer.toHexString((int) 0x00FF & b);
			if (hex.length() == 1) 
			{
			   sb.append("0");
			}
			sb.append( hex );
		}
		return sb.toString();
	}
	//--------------------------------------------------------------------------------------------------
}
