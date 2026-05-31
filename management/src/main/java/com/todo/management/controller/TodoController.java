package com.todo.management.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.management.dto.TodoDto;
import com.todo.management.service.TodoService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor

public class TodoController {
	
	private TodoService todoService;
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
		TodoDto savedTodo = todoService.addTodo(todoDto);
		return new ResponseEntity<>(savedTodo ,HttpStatus.CREATED);
	}
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	@GetMapping("/{id}")
	public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long id) {
		TodoDto todoDto = todoService.getTodoById(id);
		return new ResponseEntity<>(todoDto ,HttpStatus.OK);
	}
		@PreAuthorize("hasAnyRole('USER','ADMIN')")
		@GetMapping
		public ResponseEntity<List<TodoDto>> getAllTodos() {
			List<TodoDto> todos = todoService.getAllTodos();
			return new ResponseEntity<>(todos, HttpStatus.OK);
		}
		@PreAuthorize("hasRole('ADMIN')")
		@PutMapping("/{id}")
		public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable("id") Long id) {
			TodoDto updatedTodo = todoService.updateTodo(todoDto, id);
			return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
		}
		@PreAuthorize("hasRole('ADMIN')")
		@DeleteMapping("/{id}")
		public ResponseEntity<Void> deleteTodoById(@PathVariable("id") Long id) {
			todoService.deleteTodoById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		@PreAuthorize("hasAnyRole('USER','ADMIN')")
		@PatchMapping("/{id}/complete")
		public ResponseEntity<TodoDto> markTodoAsCompleted(@PathVariable("id") Long id) {
			TodoDto updatedTodo = todoService.markTodoAsCompleted(id);
			return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
		}
		@PreAuthorize("hasAnyRole('USER','ADMIN')")
		@PatchMapping("/{id}/incomplete")
		public ResponseEntity<TodoDto> markTodoAsIncomplete(@PathVariable("id") Long id) {
			TodoDto updatedTodo = todoService.markTodoAsIncomplete(id);
			return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
		}
}
