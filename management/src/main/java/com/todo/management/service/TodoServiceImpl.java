package com.todo.management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.todo.management.dto.TodoDto;
import com.todo.management.entity.Todo;
import com.todo.management.repository.TodoRepository;


import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

	private TodoRepository todoRepository;
	private ModelMapper modelMapper;
	
	@Override
	public TodoDto addTodo(TodoDto todoDto) {
		Todo todo = modelMapper.map(todoDto, Todo.class);
		Todo savedTodo = todoRepository.save(todo);
		TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);
		// TODO Auto-generated method stub
		return savedTodoDto;
	}

	@Override
	public TodoDto getTodoById(Long id) {
		Todo todo =todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
		
		
		// TODO Auto-generated method stub
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public List<TodoDto> getAllTodos() {
		// TODO Auto-generated method stub
		List<Todo> todos =todoRepository.findAll();
		return todos.stream().map(todo -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
		
	}

	@Override
	public TodoDto updateTodo(TodoDto todoDto, Long id) {
		// TODO Auto-generated method stub
		 Todo existingTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
		 
		 existingTodo.setTitle(todoDto.getTitle());
		 existingTodo.setDescription(todoDto.getDescription());
		 existingTodo.setCompleted(todoDto.isCompleted());
		 
		 Todo updatedTodo = todoRepository.save(existingTodo);
		 
		 return modelMapper.map(updatedTodo, TodoDto.class);
		
	}

	@Override
	public Void deleteTodoById(Long id) {
		// TODO Auto-generated method stub
		 if (!todoRepository.existsById(id)) {
	            throw new RuntimeException("Todo not found with id: " + id);
	        }
	        todoRepository.deleteById(id);
		return null;
	}

	@Override
	public TodoDto markTodoAsCompleted(Long id) {
		// TODO Auto-generated method stub
		 Todo existingTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
		 
		 existingTodo.setCompleted(Boolean.TRUE);
		 
		 Todo updatedTodo = todoRepository.save(existingTodo);
		 
		 return modelMapper.map(updatedTodo, TodoDto.class);
		
	}

	@Override
	public TodoDto markTodoAsIncomplete(Long id) {
		// TODO Auto-generated method stub
		 Todo existingTodo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
		 
		 existingTodo.setCompleted(Boolean.FALSE);
		 
		 Todo updatedTodo = todoRepository.save(existingTodo);
		 
		 return modelMapper.map(updatedTodo, TodoDto.class);
		
	}

}
