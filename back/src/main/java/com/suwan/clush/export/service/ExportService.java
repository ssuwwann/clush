package com.suwan.clush.export.service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.suwan.clush.export.domain.ExportRequest;
import com.suwan.clush.todos.domain.dto.TodoResponse;
import com.suwan.clush.todos.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExportService {

  private final TodoService todoService;

  public byte[] exportTodos(ExportRequest request) {
    List<TodoResponse> todos = todoService.findTodosByDateAndPeriod(request.date(), request.period());

    return switch (request.type().toLowerCase()) {
      case "excel" -> createExcelFile(todos);
      case "pdf" -> createPdfFile(todos);
      default -> throw new IllegalStateException("Unsupported export type" + request.type());
    };
  }

  private byte[] createExcelFile(List<TodoResponse> todos) {
    try (XSSFWorkbook workbook = new XSSFWorkbook();
         ByteArrayOutputStream out = new ByteArrayOutputStream();) {

      XSSFSheet sheet = workbook.createSheet("일정");

      XSSFCellStyle headerStyle = workbook.createCellStyle();
      headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
      headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
      headerStyle.setAlignment(HorizontalAlignment.CENTER);

      for (int i = 0; i < 4; i++) sheet.autoSizeColumn(i);

      for (int i = 0; i < 4; i++) {
        int currentWidth = sheet.getColumnWidth(i);
        int minWidth = 3000;
        if (currentWidth < minWidth) sheet.setColumnWidth(i, minWidth);
      }

      Row headerRow = sheet.createRow(0);
      String[] headers = {"날짜", "내용", "중요도", "완료여부"};
      for (int i = 0; i < headers.length; i++) {
        Cell cell = headerRow.createCell(i);
        cell.setCellValue(headers[i]);
        cell.setCellStyle(headerStyle);
      }

      XSSFCellStyle dataStyle = workbook.createCellStyle();
      dataStyle.setAlignment(HorizontalAlignment.CENTER);

      int rowNum = 1;
      for (TodoResponse response : todos) {
        Row row = sheet.createRow(rowNum++);
        Cell dateCell = row.createCell(0);
        dateCell.setCellValue(response.getDueDate().toString());

        Cell descCell = row.createCell(1);
        descCell.setCellValue(response.getDescription());

        Cell importanceCell = row.createCell(2);
        importanceCell.setCellValue("★".repeat(response.getImportance()));

        Cell completedCell = row.createCell(3);
        completedCell.setCellValue(response.isCompleted() ? "완료" : "미완료");
      }

      workbook.write(out);
      return out.toByteArray();
    } catch (IOException e) {
      throw new RuntimeException("Failed to create Excel file", e);
    }
  }

  private byte[] createPdfFile(List<TodoResponse> todos) {
    try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
      Document document = new Document(PageSize.A4);
      PdfWriter.getInstance(document, out);
      document.open();

      BaseFont baseFont = BaseFont.createFont("fonts/Maplestory-Light.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
      Font titleFont = new Font(baseFont, 18, Font.BOLD);
      Font contentFont = new Font(baseFont, 12);

      Paragraph title = new Paragraph("일정 목록", titleFont);
      title.setAlignment(Element.ALIGN_CENTER);
      title.setSpacingAfter(30);
      document.add(title);

      PdfPTable table = new PdfPTable(4);
      table.setWidthPercentage(100);
      table.setWidths(new float[]{3, 6, 4, 2});

      Stream.of("날짜", "내용", "중요도", "완료여부")
              .forEach(columTitle -> {
                PdfPCell header = new PdfPCell(new Phrase(columTitle, contentFont));
                header.setBackgroundColor(java.awt.Color.LIGHT_GRAY);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setPadding(8);
                table.addCell(header);
              });

      for (TodoResponse response : todos) {
        PdfPCell dateCell = new PdfPCell(new Phrase(response.getDueDate().toString(), contentFont));
        dateCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        dateCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        dateCell.setPadding(8);
        table.addCell(dateCell);

        Paragraph descParagraph = new Paragraph(response.getDescription(), contentFont);
        PdfPCell descCell = new PdfPCell(descParagraph);
        descCell.setPadding(12);
        descCell.setVerticalAlignment(Element.ALIGN_MIDDLE);  // 세로 중앙 정렬
        descCell.setNoWrap(false);  // 자동 줄바꿈 활성화
        table.addCell(descCell);

        String stars = "★".repeat(response.getImportance());
        PdfPCell importanceCell = new PdfPCell(new Phrase(stars, contentFont));
        importanceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        importanceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        importanceCell.setPadding(8);
        table.addCell(importanceCell);

        PdfPCell completedCell = new PdfPCell(new Phrase(response.isCompleted() ? "완료" : "미완료", contentFont));
        completedCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        completedCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        completedCell.setPadding(8);
        table.addCell(completedCell);

      }

      document.add(table);
      document.close();

      return out.toByteArray();
    } catch (DocumentException | IOException e) {
      throw new RuntimeException("Failed to create Pdf file", e);
    }
  }
}
