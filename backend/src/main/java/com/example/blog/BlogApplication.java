package com.example.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication = 3가지 어노테이션의 조합:
// 1. @SpringBootConfiguration → 이 클래스가 앱의 설정 소스임을 표시
// 2. @EnableAutoConfiguration → 의존성(build.gradle)을 보고 Tomcat, Thymeleaf 등을 자동 설정
// 3. @ComponentScan → 이 패키지(com.example.blog) 하위의 @Controller, @Service 등을 자동 탐색
@SpringBootApplication
public class BlogApplication {

	// Spring Boot 앱의 시작점 (진입점)
	// SpringApplication.run()이 내장 Tomcat 서버를 띄우고, 자동 설정을 적용한다
	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}

}
