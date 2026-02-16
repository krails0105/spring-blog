package com.example.blog.dto;

import com.example.blog.entity.Post;
import com.example.blog.entity.Tag;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.Getter;

// DTO(Data Transfer Object): API 응답 전용 객체
// 엔티티를 직접 반환하면 순환 참조, 불필요한 데이터 노출 등 문제가 생김
// DTO로 필요한 데이터만 선별하여 반환
@Getter
public class PostResponse {

    private final Long id;
    private final String title;
    private final String content;
    // Category 객체 전체 대신 이름만 반환 (API 응답을 단순하게 유지)
    private final String categoryName;
    // Tag 객체 리스트 대신 이름 리스트만 반환 (순환 참조 방지)
    private final List<String> tagNames;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    // Post 엔티티 → PostResponse DTO 변환 생성자
    // Controller에서 post 엔티티를 넘기면 필요한 필드만 추출
    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        // Optional.ofNullable: null일 수 있는 값을 안전하게 처리
        // null이면 orElse 값 사용, null이 아니면 map으로 변환
        this.categoryName = Optional.ofNullable(post.getCategory())
                .map(category -> category.getName())
                .orElse(null);
        this.tagNames = Optional.ofNullable(post.getTags())
                .orElse(List.of())
                .stream().map(Tag::getName).toList();
        this.createdAt = post.getCreatedAt();
        this.updatedAt = post.getUpdatedAt();
    }
}
