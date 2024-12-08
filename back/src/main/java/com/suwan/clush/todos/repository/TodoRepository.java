package com.suwan.clush.todos.repository;

import com.suwan.clush.todos.domain.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface TodoRepository extends JpaRepository<Todo, Long> {
  Page<Todo> findAllByCreatedAtBetween(LocalDateTime startOfDay, LocalDateTime endOfDay, PageRequest pageable);
}
