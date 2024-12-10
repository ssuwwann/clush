package com.suwan.clush.todos.repository;

import com.suwan.clush.todos.domain.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
  Page<Todo> findAllByDueDateEquals(LocalDate date, PageRequest pageable);

  List<Todo> findAllByDueDateBetweenOrderByDueDateDesc(LocalDate startDate, LocalDate endDate);
}
