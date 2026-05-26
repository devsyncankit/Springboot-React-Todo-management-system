package com.todo.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.management.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
