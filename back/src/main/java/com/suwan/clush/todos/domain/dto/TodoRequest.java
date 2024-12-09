package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Importance;
import lombok.Builder;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record TodoRequest(String description, Importance importance,
                          @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dueDate, boolean isCompleted,
                          boolean isDeleted) {
  @Builder
  public TodoRequest {
  }
}
