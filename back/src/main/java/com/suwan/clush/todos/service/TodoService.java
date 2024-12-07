package com.suwan.clush.todos.service;

import com.suwan.clush.todos.domain.Todo;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TodoService {

  private final TodoRepository todoRepository;

  public TodoResponse insertTodo(TodoRequest request) {
    Todo todo = Todo.from(request);

    Todo saved = todoRepository.save(todo);
    return saved.toResponse();
  }
}
