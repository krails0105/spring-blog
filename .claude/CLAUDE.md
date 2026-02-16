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
- **Phase 9: 프론트엔드 분리 (다음)** (React + Vite)
