package com.suwan.clush.todos.controller;

import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todos")
@Slf4j
public class TodoController {

  private final TodoService todoService;

  @PostMapping
  public ResponseEntity<TodoResponse> saveTodo(@RequestBody TodoRequest request) {
    TodoResponse todoResponse = todoService.insertTodo(request);
    return ResponseEntity.ok(todoResponse);
  }

}
