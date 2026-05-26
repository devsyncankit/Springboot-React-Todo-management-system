package com.todo.management.service;

import java.util.List;

import com.todo.management.dto.TodoDto;

public interface TodoService {
	
	TodoDto addTodo(TodoDto todoDto);
	TodoDto getTodoById(Long id);
	List<TodoDto> getAllTodos();
	TodoDto updateTodo(TodoDto todoDto, Long id);
	Void deleteTodoById(Long id);
	TodoDto markTodoAsCompleted(Long id);
	TodoDto markTodoAsIncomplete(Long id);

}
