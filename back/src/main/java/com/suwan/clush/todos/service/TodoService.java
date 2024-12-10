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
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

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
    PageRequest pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.DESC, "id"));

    Page<Todo> all = todoRepository.findAllByDueDateEquals(date, pageable);

    return TodoPageResponse.of(all);
  }

  public boolean updateCompleteById(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없는 글입니다."));
    todo.updateCompleted();

    return todo.isCompleted();
  }

  public TodoResponse updateTodoById(Long id, TodoRequest request) {
    Todo todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없는 글입니다."));
    todo.update(request);

    return todo.toResponse();
  }

  public void deleteTodoById(Long id) {
    Todo todo = todoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("없는 글입니다."));

    todoRepository.delete(todo);
  }

  public List<TodoResponse> findTodosByDateAndPeriod(LocalDate date, String period) {
    LocalDate startDate;
    LocalDate endDate;

    switch (period.toLowerCase()) {
      case "daily" -> {
        startDate = date;
        endDate = date;
      }

      case "monthly" -> {
        startDate = date.withDayOfMonth(1);
        endDate = date.with(TemporalAdjusters.lastDayOfMonth());
      }
      default -> throw new IllegalArgumentException("Unsupported period: " + period);
    }

    return todoRepository.findAllByDueDateBetweenOrderByDueDateDesc(startDate, endDate)
            .stream()
            .map(Todo::toResponse)
            .collect(Collectors.toList());
  }

}
