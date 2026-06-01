package com.todo.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.todo.management.security.JwtAuthenticationEntryPoint;
import com.todo.management.security.JwtAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfig {
	
	
	private  UserDetailsService userDetailsService;
	
	private  JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	
	private  JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf ->csrf.disable())
			.authorizeHttpRequests((authz) -> {
//				authz.requestMatchers(HttpMethod.POST,"/api/**").hasRole("ADMIN");
//				authz.requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN");
//				authz.requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN");
//			authz.requestMatchers(HttpMethod.GET,"/api/**").hasAnyRole("USER","ADMIN");
//.requestMatchers(HttpMethod.PATCH,"/api/**").hasAnyRole("USER","ADMIN");
				authz.requestMatchers("/api/auth/**").permitAll();
				authz.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
				authz.anyRequest().authenticated();
			}).httpBasic(Customizer.withDefaults());
	
		http.exceptionHandling(exception -> exception
			.authenticationEntryPoint(jwtAuthenticationEntryPoint));
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}
//	
//	@Bean
//	public UserDetailsService userDetailsService() {
//		UserDetails user = User.builder()
//				.username("ankit")
//				.password(passwordEncoder().encode("password"))
//				.roles("USER")
//				.build();
//		
//		UserDetails admin = User.builder()
//				.username("admin")
//				.password(passwordEncoder().encode("password"))
//				.roles("ADMIN")
//				.build();
//		
//		return new InMemoryUserDetailsManager(user,admin);
//	}
	

}
