package com.suwan.clush.todos.domain;

import com.suwan.clush.common.BaseEntity;
import com.suwan.clush.todos.domain.dto.TodoRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.Optional;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@SQLDelete(sql = "UPDATE todo t SET t.is_deleted = true WHERE t.id = ?")
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
  private LocalDate dueDate;

  @Column(nullable = false)
  @Builder.Default
  private boolean isCompleted = false;

  @Column(nullable = false)
  @Builder.Default
  private boolean isDeleted = false;

  public static Todo from(TodoRequest request) {
    return Optional.ofNullable(request)
            .map(req -> Todo.builder()
                    .description(req.description())
                    .importance(req.importance())
                    .dueDate(req.dueDate())
                    .build())
            .orElseThrow(() -> new IllegalArgumentException("TodoRequest cannot be null"));
  }

  public TodoResponse toResponse() {
    TodoResponse response = new TodoResponse();
    response.setId(this.id);
    response.setDescription(this.description);
    response.setImportance(this.importance.getValue());
    response.setCompleted(this.isCompleted);
    response.setDueDate(this.dueDate);
    response.setCreatedAt(this.getCreatedAt());
    response.setUpdatedAt(this.getUpdatedAt());
    return response;
  }

  public void update(TodoRequest request) {
    Optional.ofNullable(request)
            .map(req -> {
              this.description = req.description();
              this.importance = req.importance();
              this.isCompleted = req.isCompleted();
              return this;
            })
            .orElseThrow(() -> new IllegalArgumentException("TodoRequest cannot be null"));
  }

  public void updateCompleted() {
    this.isCompleted = !isCompleted;
  }
}
