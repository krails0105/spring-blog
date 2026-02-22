package com.example.blog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 댓글 삭제 요청 DTO (클라이언트 → 서버)
// 삭제 시에는 비밀번호만 필요하므로 CommentRequest와 별도로 분리
// → 의도가 명확해지고, 불필요한 필드(content, author) 전송을 방지
@Getter
@Setter
@NoArgsConstructor
public class CommentDeleteRequest {

    // 댓글 작성 시 입력한 비밀번호 (본인 확인용)
    private String password;

}
