package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Importance;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class TodoResponse {

  private Long id;
  private String description;
  private Importance importance;
  private boolean isCompleted;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

}
