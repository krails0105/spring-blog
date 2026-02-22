package com.example.blog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity: JPA가 이 클래스를 DB 테이블과 매핑. 클래스명 Comment → 테이블명 comment
// @Getter/@Setter: Lombok이 모든 필드의 getter/setter를 자동 생성
// @NoArgsConstructor: JPA가 엔티티를 생성할 때 기본 생성자가 필요
@Getter
@Setter
@Entity
@NoArgsConstructor
public class Comment {

    // @Id: 이 필드가 테이블의 기본 키(Primary Key)
    // @GeneratedValue(IDENTITY): DB가 자동으로 1, 2, 3... 증가시킴 (auto_increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 댓글 내용
    private String content;

    // 작성자 닉네임 (비로그인 사용자가 직접 입력)
    private String author;

    // 댓글 삭제/수정 시 본인 확인용 비밀번호
    private String password;

    // @ManyToOne: Comment(N) → Post(1). 여러 댓글이 하나의 게시글에 속함
    // @JoinColumn: comment 테이블에 post_id 외래키 컬럼 생성
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // @PrePersist: JPA가 save()로 처음 저장하기 직전에 자동 호출
    // → createdAt, updatedAt을 현재 시간으로 세팅 (수동 설정 불필요)
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // @PreUpdate: 이미 있는 엔티티를 수정하기 직전에 자동 호출
    // → updatedAt만 갱신 (createdAt은 최초 생성 시간 유지)
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
