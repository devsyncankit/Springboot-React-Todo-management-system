package com.todo.management.service;

import com.todo.management.dto.LoginDto;
import com.todo.management.dto.RegisterDto;

public interface AuthService {
	
	String register(RegisterDto registerDto);
	
	String login(LoginDto loginDto);

}
