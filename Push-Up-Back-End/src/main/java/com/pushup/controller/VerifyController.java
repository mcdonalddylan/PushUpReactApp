package com.pushup.controller;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pushup.service.VerifyService;

@Controller
@CrossOrigin
@RequestMapping("/verify")
@MultipartConfig
public class VerifyController {

	@Autowired
	private VerifyService verServ;
	
	@GetMapping("/{code}")
	public @ResponseBody String checkCode(@PathVariable("code") int code, HttpServletResponse resp)
	{
		return verServ.checkCode(code, resp);
	}
	
	@PostMapping("/resend/{email}")
	public @ResponseBody String resendEmail(@PathVariable("email") String email)
	{
		return verServ.resendEmail(email);
	}
}
