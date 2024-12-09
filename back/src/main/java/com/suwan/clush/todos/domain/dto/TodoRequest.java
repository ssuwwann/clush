package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Importance;
import lombok.Builder;

public record TodoRequest(String description, Importance importance, boolean isCompleted, boolean isDeleted) {
  @Builder
  public TodoRequest {
  }
}
