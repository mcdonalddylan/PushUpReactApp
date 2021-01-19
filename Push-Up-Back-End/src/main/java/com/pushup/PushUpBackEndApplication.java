package com.pushup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@EnableEncryptableProperties
@SpringBootApplication
public class PushUpBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(PushUpBackEndApplication.class, args);
	}

}
