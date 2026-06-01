package com.todo.management.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {
	
	@Value("${app.jwt.secret}")
	private String jwtSecret;
	
	@Value("${app.jwt.ExpirationInMs}")
	private long jwtExpirationInMs;
	
	public String generateToken(Authentication authentication) {
		// TODO Auto-generated method stub
		String username = authentication.getName();
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
		
		return Jwts.builder()
			.subject(username)
			.issuedAt(new Date())
			.expiration(expiryDate)
			.signWith(key())
			.compact();
		
		
	}
	
	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}
	
	public String getUsernameFromJWT(String token) {
		
		return Jwts.parser().
		             verifyWith((SecretKey) key())
		             .build()
		             .parseSignedClaims(token)
		             .getPayload()
		             .getSubject();
		

	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser().verifyWith((SecretKey) key()).build().parse(token);
			return true;
		} catch (Exception ex) {
			// Log the exception or handle it as needed
			return false;
		}
	}

}
