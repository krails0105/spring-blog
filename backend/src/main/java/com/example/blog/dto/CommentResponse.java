package com.example.blog.dto;

import com.example.blog.entity.Comment;
import java.time.LocalDateTime;
import lombok.Getter;

// 댓글 응답 DTO (서버 → 클라이언트)
// Comment 엔티티에서 필요한 필드만 선별하여 반환
// 주의: password는 절대 포함하지 않음 (보안상 비밀번호를 응답에 담으면 안 됨)
@Getter
public class CommentResponse {

    private final Long id;

    private final String content;

    private final String author;

    private final LocalDateTime createdAt;

    private final LocalDateTime updatedAt;

    // Comment 엔티티 → CommentResponse DTO 변환 생성자
    // Controller에서 comment 엔티티를 넘기면 필요한 필드만 추출
    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.author = comment.getAuthor();
        this.createdAt = comment.getCreatedAt();
        this.updatedAt = comment.getUpdatedAt();
    }
}
