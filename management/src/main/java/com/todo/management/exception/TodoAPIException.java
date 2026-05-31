package com.todo.management.exception;

import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TodoAPIException extends RuntimeException {
	
	private HttpStatusCode status;	
	private String message;

}
