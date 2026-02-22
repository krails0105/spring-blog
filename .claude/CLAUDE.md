# Spring Blog Project

Spring Boot + Thymeleaf로 블로그를 직접 구현하면서 Spring을 학습하는 프로젝트.

## 기술 스택

- Spring Boot, Spring MVC, Spring Data JPA
- Thymeleaf
- H2 Database (개발) → MySQL/PostgreSQL (운영)
- Gradle, Java 17

## 환경 설정

- Java 실행 전 반드시 `jenv shell 17` 실행 (jenv로 Java 17 사용)

## 진행 방식 (필수 - 절대 위반 금지)

이 프로젝트는 **사용자가 직접 구현하면서 배우는 학습 프로젝트**입니다.

**Backend**: Claude Code의 역할은 가이드/리뷰/피드백만 제공하는 것입니다.
**Frontend**: Claude가 직접 코드를 작성하되, 문법과 개념을 설명하면서 진행합니다.

### Backend 규칙
- **절대 금지**: 코드를 직접 작성하거나, 파일을 수정하거나, 명령어를 대신 실행하는 행위
- **가이드 먼저**: 무엇을 해야 하는지 개념과 방향만 설명. 코드 예시는 사용자가 먼저 구현한 후에 제공
- **사용자가 직접**: 코드 작성, 파일 수정, 명령어 실행, 에러 해결 시도
- **코드 리뷰**: 사용자가 구현한 코드에 대해 피드백 + 개선된 코드 예시 제공

### Frontend 규칙
- **Claude가 직접 작성**: 프론트엔드 코드는 Claude가 직접 작성
- **문법/개념 설명 필수**: 코드 작성 후 사용된 React 문법, 패턴, 개념을 설명
- Phase 완료 시 Jekyll 블로그에 학습 포스트 작성 (이것만 Claude가 직접 수행)
- **Phase 완료 시 코드 점검 (필수)**: 포스트 작성 전에 해당 Phase에서 작성된 모든 코드를 점검하고, 초보자를 위한 설명 주석을 달아줄 것 (이것도 Claude가 직접 수행)
- **Phase 완료 시 리팩토링 (필수)**: 변수명, 메서드명, 클래스명이 역할에 맞는지 점검하고 Spring 관례에 맞게 리팩토링 (이것도 Claude가 직접 수행)
- **작업 종료 시 진행 상태 업데이트 (필수)**: 사용자가 작업 끝났다고 하면, "현재 진행 상태" 섹션을 최신 상태로 업데이트하여 다음 세션에서 이어갈 수 있도록 할 것

## 블로그 포스트 규칙

- **경로**: `/Users/test/Workspace/study/side-project/blog/_posts/SpringBlog/YYYY-MM-DD-제목.md`
  - ⚠️ `krails0105.github.io/_posts/`가 아님! 반드시 `blog/_posts/`에 작성할 것
- **워크플로우 (필수)**: 반드시 `/post` 스킬을 통해 작성할 것 (`dev-to-blog-draft` → `blog-post-polisher` 순차 실행). Write 도구로 직접 작성 금지!
- **Context7 검증**: 기술적 정확성만 (도메인 용어 제외)
- **포스트 내용 범위**: 구현 과정뿐만 아니라 세션 중 나온 질의응답, 기술 개념 설명(예: Gradle이란?, @Controller vs @RestController, View Resolver 등)도 함께 정리하여 포함
- **학습 여정 전체 포함 (필수)**: 최종 결과물만 다루지 말고, 학습 과정에서 거친 모든 단계를 포함할 것. 예: 세션 기반 → JWT 전환이면, 세션 기반 두 가지 방식(직접 SecurityContextHolder 사용 / AuthenticationManager 사용)도 반드시 포함

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
- Phase 10A: 세션 기반 인증 ✅
- Phase 10B: JWT 기반으로 전환 ✅
- Phase 11: 댓글 기능 ✅ (누구나 댓글 작성, 비밀번호 기반 삭제/수정)
- Phase 12: (예정)

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

## Phase 11: 댓글 기능 구현

### 설계 요약
- **누구나 댓글 작성 가능**: 비로그인 사용자도 닉네임 + 비밀번호로 댓글 작성
- **삭제/수정 시 비밀번호 확인**: 작성 시 입력한 비밀번호로 본인 확인
- **관리자**: 로그인한 관리자는 모든 댓글 삭제 가능

### 구현 파일

| # | 위치 | 파일 | 설명 |
|---|------|------|------|
| 1 | Backend | `entity/Comment.java` | 댓글 엔티티 (Post와 ManyToOne 관계) |
| 2 | Backend | `repository/CommentRepository.java` | 댓글 저장소 (게시글별 페이징 조회) |
| 3 | Backend | `dto/CommentRequest.java` | 댓글 작성/수정 요청 DTO |
| 4 | Backend | `dto/CommentDeleteRequest.java` | 댓글 삭제 요청 DTO (비밀번호만) |
| 5 | Backend | `dto/CommentResponse.java` | 댓글 응답 DTO (비밀번호 제외) |
| 6 | Backend | `service/CommentService.java` | 댓글 비즈니스 로직 (비밀번호 검증 포함) |
| 7 | Backend | `controller/CommentApiController.java` | 댓글 REST API 컨트롤러 |
| 8 | Backend | `config/SecurityConfig.java` | 댓글 API 접근 권한 추가 |
| 9 | Frontend | `api/commentApi.js` | 댓글 API 호출 함수 |
| 10 | Frontend | `components/CommentSection.jsx` | 댓글 영역 컴포넌트 |
| 11 | Frontend | `pages/PostDetailPage.jsx` | CommentSection 연동 |

### API 엔드포인트

| Method | Endpoint | Description | 인증 |
|--------|----------|-------------|------|
| GET | `/api/posts/{postId}/comments` | 댓글 목록 조회 (페이징) | 불필요 |
| POST | `/api/posts/{postId}/comments` | 댓글 작성 | 불필요 |
| PUT | `/api/comments/{id}` | 댓글 수정 | 비밀번호 확인 |
| DELETE | `/api/comments/{id}` | 댓글 삭제 | 비밀번호 확인 |

### 학습 키워드
- `@ManyToOne` / `@JoinColumn`: JPA 연관관계 매핑
- `@PrePersist` / `@PreUpdate`: JPA 라이프사이클 콜백 (createdAt/updatedAt 자동 설정)
- `Page<T>` / `Pageable`: Spring Data JPA 페이징
- `ResponseEntity` vs 직접 반환: HTTP 상태 코드 제어
- `@Setter`가 Request DTO에 필요한 이유: Jackson JSON 역직렬화 과정
- Spring Security `requestMatchers`: URL별 접근 권한 설정
