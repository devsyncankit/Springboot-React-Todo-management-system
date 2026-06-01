package com.todo.management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.management.dto.JwtAuthResponse;
import com.todo.management.dto.LoginDto;
import com.todo.management.dto.RegisterDto;
import com.todo.management.service.AuthService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
		String response = authService.login(loginDto);
		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse(response, "Bearer");
		jwtAuthResponse.setAccessToken(response);
		return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
	}

}
