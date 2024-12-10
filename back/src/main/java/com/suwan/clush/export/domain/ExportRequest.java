package com.suwan.clush.export.domain;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public record ExportRequest(String type, String period, @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
}
