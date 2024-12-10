package com.suwan.clush.export.controller;

import com.suwan.clush.export.domain.ExportRequest;
import com.suwan.clush.export.service.ExportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/export")
@Slf4j
public class ExportController {

  private final ExportService exportService;

  @GetMapping
  public ResponseEntity<Resource> exportTodos(ExportRequest request) {
    byte[] fileContent = exportService.exportTodos(request);

    String filename = String.format("export-%s-%s-%s-%s",
            request.period(), request.type(), request.date(), request.type().equals("excel") ? "xlsx" : "pdf");

    ByteArrayResource resource = new ByteArrayResource(fileContent);

    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
            .header(HttpHeaders.ACCEPT, "application/octet-stream")
            .contentType(request.type().equals("excel") ?
                    MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") :
                    MediaType.APPLICATION_PDF)
            .body(resource);
  }

}
