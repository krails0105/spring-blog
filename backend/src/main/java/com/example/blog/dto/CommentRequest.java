package com.example.blog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 댓글 작성/수정 요청 DTO (클라이언트 → 서버)
// JSON 요청 본문을 Java 객체로 변환하기 위한 그릇
// @NoArgsConstructor + @Setter: Jackson이 JSON → 객체 변환 시 필요
//   1) 기본 생성자로 빈 객체 생성 → 2) setter로 JSON 필드값 채움
@Getter
@Setter
@NoArgsConstructor
public class CommentRequest {

    // 댓글 내용
    private String content;

    // 작성자 닉네임
    private String author;

    // 댓글 비밀번호 (수정/삭제 시 본인 확인용)
    private String password;
}
