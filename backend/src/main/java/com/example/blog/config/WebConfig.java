package com.example.blog.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS(Cross-Origin Resource Sharing) 설정
// 브라우저는 보안상 다른 출처(origin)의 요청을 차단함
// 프론트(localhost:5173)와 백엔드(localhost:8080)는 포트가 달라서 "다른 출처"
// 이 설정으로 프론트에서 백엔드 API를 호출할 수 있게 허용
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            // /api/** 경로의 모든 API에 CORS 허용
            .addMapping("/api/**")
            // 로컬 개발 서버 + Vercel 배포 도메인 허용
            // allowedOriginPatterns: 와일드카드(*) 패턴 지원 (allowedOrigins는 불가)
            .allowedOriginPatterns("http://localhost:5173", "https://*.vercel.app")
            // 허용할 HTTP 메서드 (GET, POST, PUT, DELETE)
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            // 모든 요청 헤더 허용 (Content-Type 등)
            .allowedHeaders("*");
    }
}