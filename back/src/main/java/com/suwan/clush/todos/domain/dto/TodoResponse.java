package com.suwan.clush.todos.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class TodoResponse {

  private Long id;
  private String description;
  private int importance;
  private boolean isCompleted;
  private LocalDate dueDate;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

}
