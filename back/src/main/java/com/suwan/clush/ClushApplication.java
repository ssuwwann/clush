package com.suwan.clush;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ClushApplication {

  public static void main(String[] args) {
    SpringApplication.run(ClushApplication.class, args);
  }

}
