package com.todo.management.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.todo.management.dto.LoginDto;
import com.todo.management.dto.RegisterDto;
import com.todo.management.entity.Role;
import com.todo.management.entity.User;
import com.todo.management.exception.TodoAPIException;
import com.todo.management.repository.RoleRepository;
import com.todo.management.repository.UserRepository;
import com.todo.management.security.JwtTokenProvider;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private RoleRepository roleRepository;
	
	private AuthenticationManager authenticationManager;
	private JwtTokenProvider jwtTokenProvider;
	
	@Override
	public String register(RegisterDto registerDto) {
		// TODO Auto-generated method stub
		if(userRepository.existsByUsername(registerDto.getUsername())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Username is already taken!");
			
		}
		if(userRepository.existsByEmail(registerDto.getEmail())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST,"Email is already taken!");
			
		}
		
		User user = new User();
		user.setName(registerDto.getName());
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		
		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName("ROLE_USER")
				.orElseThrow(() -> new TodoAPIException(HttpStatus.NOT_FOUND, "User Role not set."));
		roles.add(userRole);
		user.setRoles(roles);
		userRepository.save(user);
		return "User registered successfully!";
	}

	@Override
	public String login(LoginDto loginDto) {
		// TODO Auto-generated method stub
		Authentication authentication =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginDto.getUsernameOrEmail(), loginDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtTokenProvider.generateToken(authentication);
		
		return token;
	}

}
