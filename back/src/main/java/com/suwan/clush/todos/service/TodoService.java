package com.suwan.clush.todos.service;

import com.suwan.clush.todos.domain.Todo;
import com.suwan.clush.todos.domain.dto.TodoPageResponse;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TodoService {

  private final TodoRepository todoRepository;

  public void insertTodo(TodoRequest request) {
    Todo todo = Todo.from(request);
    todoRepository.save(todo);
  }

  @Transactional(readOnly = true)
  public TodoPageResponse findTodosByDate(int page, LocalDate date) {
    PageRequest pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.ASC, "id"));

    LocalDateTime startOfDay = date.atStartOfDay();
    LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

    Page<Todo> all = todoRepository.findAllByCreatedAtBetween(startOfDay, endOfDay, pageable);

    return TodoPageResponse.of(all);
  }

  @Transactional(readOnly = true)
  public TodoResponse findTodoById(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow();

    return todo.toResponse();
  }
}