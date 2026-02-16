package com.example.blog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// @Entity: JPA가 이 클래스를 DB 테이블과 매핑. 클래스명 Post → 테이블명 post
// @Getter/@Setter: Lombok이 모든 필드의 getter/setter를 자동 생성
// @NoArgsConstructor: JPA가 엔티티를 생성할 때 기본 생성자가 필요
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {

    // @Id: 이 필드가 테이블의 기본 키(Primary Key)
    // @GeneratedValue(IDENTITY): DB가 자동으로 1, 2, 3... 증가시킴 (auto_increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // @Lob: 긴 텍스트를 저장할 수 있도록 대용량 컬럼 타입(CLOB) 사용
    // 없으면 기본 VARCHAR(255)라서 글 내용이 잘릴 수 있음
    @Lob
    private String content;

    // @ManyToOne: Post(N) → Category(1). 여러 글이 하나의 카테고리에 속함
    // @JoinColumn: post 테이블에 category_id 외래키 컬럼 생성
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // @ManyToMany: Post(N) ↔ Tag(N). 글과 태그는 다대다 관계
    // @JoinTable: 중간 테이블 post_tags를 생성하여 관계 관리
    @ManyToMany
    @JoinTable(name = "post_tags", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
