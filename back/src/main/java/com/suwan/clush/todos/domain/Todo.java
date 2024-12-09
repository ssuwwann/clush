package com.suwan.clush.todos.domain;

import com.suwan.clush.common.BaseEntity;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.Optional;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE todo t t.isDeleted = true WHERE t.id = ?")
@SQLRestriction("is_deleted = false")
public class Todo extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String description;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  @Builder.Default
  private Importance importance = Importance.L1;

  @Column(nullable = false)
  private boolean completed = false;

  @Column(nullable = false)
  private boolean isDeleted = false;

  public static Todo from(TodoRequest request) {
    return Optional.ofNullable(request)
            .map(req -> Todo.builder()
                    .description(req.description())
                    .importance(req.importance())
                    .build())
            .orElseThrow(() -> new IllegalArgumentException("TodoRequest cannot be null"));
  }

  public TodoResponse toResponse() {
    TodoResponse response = new TodoResponse();
    response.setId(this.id);
    response.setDescription(this.description);
    response.setImportance(this.importance);
    response.setCreatedAt(this.getCreatedAt());
    response.setUpdatedAt(this.getUpdatedAt());
    return response;
  }

  public void update(TodoRequest request) {
    Optional.ofNullable(request)
            .map(req -> {
              this.description = req.description();
              this.importance = req.importance();
              this.completed = req.completed();
              this.isDeleted = req.isDeleted();
              return this;
            })
            .orElseThrow(() -> new IllegalArgumentException("TodoRequest cannot be null"));
  }

}
