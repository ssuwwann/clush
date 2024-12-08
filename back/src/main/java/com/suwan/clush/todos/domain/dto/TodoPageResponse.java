package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Todo;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class TodoPageResponse {
  private List<TodoResponse> todos;
  private int currentPage;
  private int totalPages;
  private long totalElements;
  private boolean first;
  private boolean last;

  public static TodoPageResponse of(Page<Todo> todoPage) {
    return TodoPageResponse.builder()
            .todos(todoPage.getContent().stream()
                    .map(Todo::toResponse)
                    .collect(Collectors.toList()))
            .currentPage(todoPage.getNumber() + 1)
            .totalPages(todoPage.getTotalPages())
            .totalElements(todoPage.getTotalElements())
            .first(todoPage.isFirst())
            .last(todoPage.isLast())
            .build();
  }
}
