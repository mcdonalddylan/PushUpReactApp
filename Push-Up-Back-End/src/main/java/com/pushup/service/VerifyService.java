package com.pushup.service;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pushup.model.Users;
import com.pushup.model.Verify;
import com.pushup.repo.UsersRepo;
import com.pushup.repo.VerifyRepo;

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
					return "ERROR: This verification id has already been verified.";
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
		}
		
	}
}
