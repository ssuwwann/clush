package com.suwan.clush.todos.service;

import com.suwan.clush.todos.domain.Importance;
import com.suwan.clush.todos.domain.Todo;
import com.suwan.clush.todos.domain.dto.TodoPageResponse;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.repository.TodoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

  private static final Logger log = LoggerFactory.getLogger(TodoServiceTest.class);
  @Mock
  private TodoRepository todoRepository;

  @InjectMocks
  private TodoService todoService;

  @Test
  @DisplayName("insert todo")
  void insertTodo() {
    // given
    TodoRequest request = new TodoRequest("테스트", Importance.L1, LocalDate.now(), false);
    Todo todo = Todo.from(request);

    when(todoRepository.save(any(Todo.class))).thenReturn(todo);

    // when
    todoService.insertTodo(request);

    // then
    verify(todoRepository, times(1)).save(any(Todo.class));
  }

  @Test
  @DisplayName("find todos by due date")
  void findTodosByDate() {
    // given
    LocalDate dueDate = LocalDate.now();
    PageRequest pageable = PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id"));

    List<Todo> todos = List.of(
            Todo.builder()
                    .id(1L)
                    .description("테스트1")
                    .importance(Importance.L1)
                    .dueDate(dueDate)
                    .build(),
            Todo.builder()
                    .id(2L)
                    .description("테스트1")
                    .importance(Importance.L1)
                    .dueDate(dueDate)
                    .build()
    );

    PageImpl<Todo> todoPage = new PageImpl<>(todos, pageable, todos.size());

    when(todoRepository.findAllByDueDateEquals(eq(dueDate), any(PageRequest.class)))
            .thenReturn(todoPage);

    // when
    TodoPageResponse response = todoService.findTodosByDate(0, dueDate);

    // then
    assertThat(response.getTodos()).hasSize(2);
    verify(todoRepository, times(1)).findAllByDueDateEquals(eq(dueDate), any(PageRequest.class));
  }

  @Test
  @DisplayName("update todo complete status by id")
  void updateCompleteById() {
    // given
    Long id = 1L;
    Todo todo = Todo.builder()
            .id(1L)
            .description("테스트1")
            .importance(Importance.L1)
            .dueDate(LocalDate.now())
            .isCompleted(false)
            .build();

    when(todoRepository.findById(id)).thenReturn(Optional.of(todo));

    // when
    boolean result = todoService.updateCompleteById(id);
    TodoResponse todoResponse = todo.toResponse();

    // then
    assertThat(result).isTrue();
    assertThat(todoResponse.isCompleted()).isTrue();
    verify(todoRepository, times(1)).findById(id);
  }

  @Test
  @DisplayName("update todo by id")
  void updateTodoById() {
    // given
    Long id = 1L;
    TodoRequest request = new TodoRequest("테스트 수정", Importance.L1, LocalDate.now(), true);
    Todo todo = Todo.builder()
            .id(1L)
            .description("테스트 원본")
            .importance(Importance.L1)
            .dueDate(LocalDate.now())
            .isCompleted(false)
            .build();

    when(todoRepository.findById(id)).thenReturn(Optional.of(todo));

    // when
    TodoResponse response = todoService.updateTodoById(id, request);

    // then
    assertThat(response.getDescription()).isEqualTo("테스트 수정");
    assertThat(response.isCompleted()).isTrue();
    verify(todoRepository, times(1)).findById(id);
  }

  @Test
  @DisplayName("delete todo by id")
  void deleteTodoById() {
    // given
    Long id = 1L;
    Todo todo = Todo.builder()
            .id(1L)
            .description("테스트 원본")
            .importance(Importance.L1)
            .dueDate(LocalDate.now())
            .isCompleted(false)
            .build();
    when(todoRepository.findById(id)).thenReturn(Optional.of(todo));

    // when
    todoService.deleteTodoById(id);

    // then
    verify(todoRepository, times(1)).findById(id);
    verify(todoRepository, times(1)).delete(todo);
  }
}