package com.example.blog.config;

import com.example.blog.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration: Spring 설정 클래스임을 선언
// @EnableWebSecurity: Spring Security 활성화
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CSRF 비활성화: REST API는 세션을 사용하지 않으므로 CSRF 보호 불필요
            .csrf(csrf -> csrf.disable())
            // URL별 접근 권한 설정
            // 규칙은 위에서 아래로 순서대로 적용됨 (먼저 매칭되는 규칙이 우선)
            .authorizeHttpRequests(auth -> auth
                // GET 요청은 모두 허용 (글/댓글 조회는 누구나 가능)
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                // 인증 API는 비로그인 상태에서 호출해야 하므로 허용
                .requestMatchers(HttpMethod.GET, "/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                // 댓글 작성/삭제는 비로그인 사용자도 가능 (비밀번호로 본인 확인)
                .requestMatchers(HttpMethod.POST, "/api/posts/*/comments").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/comments/**").permitAll()
                // H2 콘솔 접근 허용 (개발 환경용)
                .requestMatchers("/h2-console/**").permitAll()
                // 위에 명시되지 않은 나머지 요청은 인증 필요 (글 작성/수정/삭제 등)
                .anyRequest().authenticated()
            )
            // JWT 기반 인증이므로 세션을 생성하지 않음 (STATELESS)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // JWT 필터를 Spring Security 기본 인증 필터 앞에 추가
            // → 매 요청마다 JWT 토큰을 먼저 확인하여 인증 처리
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            // H2 콘솔이 iframe을 사용하므로 frameOptions 비활성화
            .headers(headers -> headers.frameOptions(frame -> frame.disable()))
            // 폼 로그인, HTTP Basic 인증 비활성화 (JWT만 사용)
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }

}
