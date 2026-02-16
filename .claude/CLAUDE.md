# Spring Blog Project

Spring Boot + Thymeleaf로 블로그를 직접 구현하면서 Spring을 학습하는 프로젝트.

## 기술 스택

- Spring Boot, Spring MVC, Spring Data JPA
- Thymeleaf
- H2 Database (개발) → MySQL/PostgreSQL (운영)
- Gradle, Java 17

## 진행 방식 (필수 - 절대 위반 금지)

이 프로젝트는 **사용자가 직접 구현하면서 배우는 학습 프로젝트**입니다.

**Claude Code의 역할은 가이드/리뷰/피드백만 제공하는 것입니다.**

- **절대 금지**: 코드를 직접 작성하거나, 파일을 수정하거나, 명령어를 대신 실행하는 행위
- **가이드 먼저**: 무엇을 해야 하는지 개념과 방향만 설명. 코드 예시는 사용자가 먼저 구현한 후에 제공
- **사용자가 직접**: 코드 작성, 파일 수정, 명령어 실행, 에러 해결 시도
- **코드 리뷰**: 사용자가 구현한 코드에 대해 피드백 + 개선된 코드 예시 제공
- Phase 완료 시 Jekyll 블로그에 학습 포스트 작성 (이것만 Claude가 직접 수행)
- **Phase 완료 시 코드 점검 (필수)**: 포스트 작성 전에 해당 Phase에서 작성된 모든 코드를 점검하고, 초보자를 위한 설명 주석을 달아줄 것 (이것도 Claude가 직접 수행)
- **Phase 완료 시 리팩토링 (필수)**: 변수명, 메서드명, 클래스명이 역할에 맞는지 점검하고 Spring 관례에 맞게 리팩토링 (이것도 Claude가 직접 수행)
- **작업 종료 시 진행 상태 업데이트 (필수)**: 사용자가 작업 끝났다고 하면, "현재 진행 상태" 섹션을 최신 상태로 업데이트하여 다음 세션에서 이어갈 수 있도록 할 것

## 블로그 포스트 규칙

- **경로**: `/Users/test/Workspace/study/side-project/blog/_posts/SpringBlog/YYYY-MM-DD-제목.md`
- **워크플로우**: `dev-to-blog-draft` → `blog-post-polisher` (순차 실행)
- **Context7 검증**: 기술적 정확성만 (도메인 용어 제외)
- **포스트 내용 범위**: 구현 과정뿐만 아니라 세션 중 나온 질의응답, 기술 개념 설명(예: Gradle이란?, @Controller vs @RestController, View Resolver 등)도 함께 정리하여 포함

## 코드 스타일

- 초보자도 이해할 수 있는 코드 주석
- Spring 관례(Convention) 준수
- 계층 구조: Controller → Service → Repository

## 현재 진행 상태

- Phase 1: 프로젝트 초기 세팅 ✅
- Phase 2: 기본 페이지 구현 ✅
- Phase 3: 게시글 CRUD ✅
- Phase 4: 카테고리 & 태그 ✅
- Phase 5: Markdown 지원 ✅
- Phase 6: 검색 & 페이징 ✅
- Phase 7: 배포 ✅ (Railway + PostgreSQL)
- Phase 8: REST API 전환 ✅ (@RestController, DTO, ResponseEntity)
- Phase 9: 프론트엔드 분리 ✅ (React + Vite, CORS, API 연동)
- **Phase 10A: 세션 기반 인증 (진행중)** ← 현재
- Phase 10B: JWT 기반으로 전환 (예정)

## Phase 10: 로그인/인증 기능 구현

> **학습 방식 진행**: Phase 10A부터 사용자가 직접 구현하면서 배우는 방식으로 진행.
> Claude는 단계별로 개념 설명 + 가이드만 제공하고, 사용자가 직접 코드를 작성한다.

### 설계 요약
- **1인 블로그**: 관리자 계정 1개 (회원가입 불필요)
- **Phase 10A**: 세션 기반 인증 (JSESSIONID 쿠키)
- **Phase 10B**: JWT 기반으로 전환 (Authorization Bearer 헤더)
- 비로그인 → 글 읽기만 가능 / 로그인 → 작성/수정/삭제 가능

### Phase 10A 구현 순서 (세션 기반)

| # | 위치 | 작업 | 파일 |
|---|------|------|------|
| 1 | Backend | Spring Security 의존성 추가 | `build.gradle` |
| 2 | Backend | 관리자 계정 설정 (환경변수) | `application.properties` |
| 3 | Backend | SecurityConfig 작성 | `config/SecurityConfig.java` (신규) |
| 4 | Backend | WebConfig CORS에 credentials 추가 | `config/WebConfig.java` |
| 5 | Backend | 인증 DTO 작성 | `dto/LoginRequest.java`, `dto/LoginResponse.java` (신규) |
| 6 | Backend | AuthController 작성 | `controller/AuthController.java` (신규) |
| 7 | Frontend | authApi.js 작성 | `api/authApi.js` (신규) |
| 8 | Frontend | postApi.js에 credentials 추가 | `api/postApi.js` |
| 9 | Frontend | AuthContext 작성 | `contexts/AuthContext.jsx` (신규) |
| 10 | Frontend | main.jsx에 AuthProvider 적용 | `main.jsx` |
| 11 | Frontend | LoginPage 작성 | `pages/LoginPage.jsx` (신규) |
| 12 | Frontend | App.jsx 조건부 UI + 라우트 가드 | `App.jsx` |
| 13 | Frontend | PostDetailPage 조건부 버튼 | `pages/PostDetailPage.jsx` |

### Phase 10B 구현 순서 (JWT 전환)

| # | 위치 | 작업 | 파일 |
|---|------|------|------|
| 1 | Backend | JJWT 의존성 추가 | `build.gradle` |
| 2 | Backend | JWT 설정값 추가 | `application.properties` |
| 3 | Backend | JwtTokenProvider 작성 | `security/JwtTokenProvider.java` (신규) |
| 4 | Backend | JwtAuthenticationFilter 작성 | `security/JwtAuthenticationFilter.java` (신규) |
| 5 | Backend | SecurityConfig 수정 (STATELESS + JWT 필터) | `config/SecurityConfig.java` |
| 6 | Backend | LoginResponse에 token 필드 추가 | `dto/LoginResponse.java` |
| 7 | Backend | AuthController 수정 (JWT 토큰 발급) | `controller/AuthController.java` |
| 8 | Frontend | authApi.js 수정 (localStorage 토큰 관리) | `api/authApi.js` |
| 9 | Frontend | postApi.js 수정 (Bearer 헤더) | `api/postApi.js` |
| 10 | Frontend | AuthContext 수정 | `contexts/AuthContext.jsx` |

### API 엔드포인트 (인증)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | 로그인 |
| POST | `/api/auth/logout` | 로그아웃 |
| GET | `/api/auth/status` | 로그인 상태 확인 |

### 세션 vs JWT 비교

| 항목 | 세션 기반 (10A) | JWT 기반 (10B) |
|------|----------------|----------------|
| 상태 관리 | Stateful (서버 세션) | Stateless (토큰 자체에 정보) |
| 전송 방식 | 쿠키 자동 전송 | Authorization 헤더 수동 전송 |
| CORS | allowCredentials 필요 | 불필요 |
| 로그아웃 | 서버에서 세션 파기 | 클라이언트 토큰 삭제 |
| 확장성 | 서버 증설 시 세션 공유 문제 | 서버 증설에 유리 |
