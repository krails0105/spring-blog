# Spring Boot Blog Project

Spring Boot + Thymeleaf로 블로그를 직접 구현하면서 Spring을 학습하는 프로젝트.

## 목표

- Spring MVC, JPA, Thymeleaf 등 핵심 기술을 블로그 구현을 통해 실전 학습
- 각 Phase 완료 시 Jekyll 블로그에 학습 포스트 작성

## 기술 스택

| 구분 | 기술 |
|------|------|
| Backend | Spring Boot, Spring MVC, Spring Data JPA |
| Template | Thymeleaf |
| Database | H2 (개발) → MySQL/PostgreSQL (운영) |
| Build | Gradle |
| Java | 17 |

## 로드맵

| Phase | 주제 | 학습 포인트 | 블로그 포스트 | 상태 |
|-------|------|------------|--------------|------|
| 1 | 프로젝트 초기 세팅 | Spring Initializr, 프로젝트 구조, 의존성 | Spring Boot 프로젝트 생성과 구조 이해 | ✅ |
| 2 | 기본 페이지 구현 | Controller, Thymeleaf 템플릿, 레이아웃 공통화 | Thymeleaf 기본 사용법과 레이아웃 구성 | ✅ |
| 3 | 게시글 CRUD | Entity, Repository, Service, Controller 계층 | Spring MVC + JPA로 CRUD 구현하기 | ✅ |
| 4 | 카테고리 & 태그 | ManyToOne, ManyToMany 연관관계 | JPA 연관관계 - 카테고리와 태그 | ✅ |
| 5 | Markdown 지원 | commonmark-java, Markdown → HTML 변환 | Markdown 렌더링 적용하기 | ✅ |
| 6 | 검색 & 페이징 | Spring Data JPA Pageable, 동적 쿼리 | 페이징과 검색 기능 구현 | ✅ |
| 7 | 배포 | DB 전환, Railway/Render 배포 | 배포하기 | 미진행 |

## 진행 방식

1. 각 Phase의 요구사항을 확인
2. 직접 코드 구현
3. Claude Code로 코드 리뷰 + 피드백
4. Jekyll 블로그에 학습 포스트 작성 (`blog/_posts/SpringBlog/`)

## 블로그 포스트 경로

```
/Users/test/Workspace/study/side-project/blog/_posts/SpringBlog/YYYY-MM-DD-제목.md
```

## Phase 상세

### Phase 1: 프로젝트 초기 세팅

**의존성:**
- Spring Web
- Thymeleaf
- Spring Data JPA
- H2 Database
- Lombok

**완료 기준:**
- [ ] Spring Initializr로 프로젝트 생성
- [ ] `localhost:8080` 접속 시 정상 응답 확인
- [ ] 프로젝트 디렉토리 구조 이해

### Phase 2: 기본 페이지 구현

**완료 기준:**
- [ ] 홈 컨트롤러 + Thymeleaf 템플릿 작성
- [ ] 정적 리소스(CSS) 설정
- [ ] Thymeleaf 레이아웃 구조 (header, footer 공통화)

### Phase 3: 게시글 CRUD

**완료 기준:**
- [ ] Post 엔티티 설계 (title, content, createdAt 등)
- [ ] Repository, Service, Controller 계층 구현
- [ ] 글 목록 / 상세 / 작성 / 수정 / 삭제 화면

### Phase 4: 카테고리 & 태그

**완료 기준:**
- [ ] Category 엔티티 + Post 연관관계 (ManyToOne)
- [ ] Tag 엔티티 + Post 연관관계 (ManyToMany)
- [ ] 카테고리별 필터링

### Phase 5: Markdown 지원

**완료 기준:**
- [ ] commonmark-java 라이브러리 적용
- [ ] 글 작성 시 Markdown 입력, 조회 시 HTML 렌더링

### Phase 6: 검색 & 페이징

**완료 기준:**
- [x] Spring Data JPA 페이징 처리
- [x] 제목/내용 검색 기능

### Phase 7: 배포

**완료 기준:**
- [ ] H2 → MySQL/PostgreSQL 전환
- [ ] Railway 또는 Render에 배포
