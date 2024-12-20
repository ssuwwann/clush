package com.suwan.clush.todos.controller;

import com.suwan.clush.todos.domain.dto.TodoPageResponse;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todos")
@Slf4j
public class TodoController {

  private final TodoService todoService;

  @PostMapping
  public ResponseEntity<Void> saveTodo(@RequestBody TodoRequest request) {
    todoService.insertTodo(request);

    return ResponseEntity.ok().build();
  }

  @GetMapping()
  public ResponseEntity<TodoPageResponse> getTodos(
          @RequestParam(required = false, defaultValue = "1", value = "page") int page,
          @RequestParam("due-date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dueDate) {
    TodoPageResponse todos = todoService.findTodosByDate(page - 1, dueDate);

    return ResponseEntity.ok(todos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Boolean> editCompleteById(@PathVariable Long id) {
    boolean result = todoService.updateCompleteById(id);

    return ResponseEntity.ok(result);
  }

  @RequestMapping(path = "/{id}", method = {RequestMethod.PATCH, RequestMethod.PUT})
  public ResponseEntity<TodoResponse> editTodoById(@PathVariable Long id, @RequestBody TodoRequest request) {
    TodoResponse updateTodo = todoService.updateTodoById(id, request);

    return ResponseEntity.ok(updateTodo);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> removeTodoById(@PathVariable Long id) {
    todoService.deleteTodoById(id);

    return ResponseEntity.ok().build();
  }
}
