package com.suwan.clush.todos.domain.dto;

import com.suwan.clush.todos.domain.Importance;

public record TodoRequest(String description, Importance importance) {
}
