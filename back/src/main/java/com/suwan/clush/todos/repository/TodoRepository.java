package com.suwan.clush.todos.repository;

import com.suwan.clush.todos.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
