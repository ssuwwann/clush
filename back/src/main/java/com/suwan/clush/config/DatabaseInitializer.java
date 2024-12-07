package com.suwan.clush.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DatabaseInitializer implements CommandLineRunner {

  @Autowired
  private DataSourceProperties primaryProperties;

  @Value("${mysql.username}")
  private String username;
  @Value("${mysql.password}")
  private String password;

  @Override
  public void run(String... args) throws Exception {

    // root 계정으로 임시 db source 생성
    DataSource rootDataSource = DataSourceBuilder.create()
            .url(primaryProperties.getUrl())
            .username(username)
            .password(password)
            .build();

    JdbcTemplate jdbcTemplate = new JdbcTemplate(rootDataSource);

    try {
      jdbcTemplate.execute("CREATE DATABASE IF NOT EXISTS clush");
      jdbcTemplate.execute("CREATE USER IF NOT EXISTS 'clush'@'localhost' IDENTIFIED BY 'clush'");
      jdbcTemplate.execute("GRANT ALL PRIVILEGES ON clush.* TO 'clush'@'localhost'");
      jdbcTemplate.execute("FLUSH PRIVILEGES");
    } finally {
      if (rootDataSource instanceof HikariDataSource) ((HikariDataSource) rootDataSource).close();
    }

  }
}
