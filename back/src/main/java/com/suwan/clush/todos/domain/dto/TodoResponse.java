package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Importance;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TodoResponse {

  private Long id;
  private String description;
  private Importance importance;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

}
