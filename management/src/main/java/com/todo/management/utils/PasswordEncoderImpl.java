package com.todo.management.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderImpl {

	public static void main(String[] args) {
		
		PasswordEncoder  passwordEncoder = new BCryptPasswordEncoder();
		System.out.println(passwordEncoder.encode("ankit123"));
		
		System.out.println(passwordEncoder.encode("admin123"));
	}
}
