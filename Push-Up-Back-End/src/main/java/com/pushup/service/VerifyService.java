package com.pushup.service;

import java.util.Random;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pushup.model.Users;
import com.pushup.model.Verify;
import com.pushup.repo.UsersRepo;
import com.pushup.repo.VerifyRepo;
import com.pushup.util.EmailUtil;

@Service
public class VerifyService {

	@Autowired
	private VerifyRepo verRepo;
	
	@Autowired
	private UsersRepo userRepo;
	
	public String checkCode(int code, HttpServletResponse resp)
	{
		try {
			//check if verification code exists
			Verify verTest = verRepo.findByCode(code);
			
			if (verTest != null)
			{
				if(verTest.isUsed() == false)
				{
					verRepo.setUsedForVerify(true, verTest.getCode());
					
					Users verifiedUser = userRepo.findByEmail(verTest.getEmail());
					userRepo.setVerifiedForUsers(true, verifiedUser.getId());
					
					//redirecting you to the correct front-end page
					resp.setHeader("Location", "http://localhost:3000/");
					resp.setStatus(302);
					
					return "***Valid verification id! Redirecting you now.***";
				}
				else
				{
					return "ERROR: This verification id has already been used.";
				}
				
			}
			else
			{
				return "ERROR: Unknown verification id value.";
			}
		}catch(EntityNotFoundException e)
		{
			e.printStackTrace();
			return "ERROR: Unknown verification id value.";
		}catch(Error e)
		{
			e.printStackTrace();
			return "ERROR: Unknown verification id value.";
		}
		
	}
	
	public String resendEmail(String email)
	{
		try {
			verRepo.deleteByEmail(email);
			
			//creating the new verify object
			Random rand = new Random();
			int code = rand.nextInt(1000000000) + rand.nextInt(1000000000);
			Verify newVer = new Verify(code, email, false);
			verRepo.save(newVer);
			
			EmailUtil.sendMail(email, "Welcome to the Push Up App!", 
		       		"Please click this link to validate your account: "
		       		+ "<a href=\"http://localhost:2020/verify/"+code+"\">http://localhost:2020/verify/"+code+"</a>.");
			
			return "success";
		}catch(Exception e)
		{
			e.printStackTrace();
			return "error";
		}
		
		
	}
}
