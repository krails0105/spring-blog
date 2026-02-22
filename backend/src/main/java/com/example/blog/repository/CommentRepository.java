package com.example.blog.repository;

import com.example.blog.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Comment, Long>: Comment 엔티티를 Long 타입 ID로 관리하는 저장소
// 기본 CRUD 메서드(save, findById, deleteById 등)를 자동 제공
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Spring Data JPA 쿼리 메서드: 메서드 이름만으로 SQL을 자동 생성
    // findBy + PostId → WHERE post_id = ?
    // OrderBy + CreatedAt + Desc → ORDER BY created_at DESC (최신순)
    // Pageable 파라미터 → LIMIT/OFFSET 페이징 처리
    // 반환 타입 Page<Comment> → 페이징 정보(총 개수, 총 페이지 수 등) 포함
    Page<Comment> findByPostIdOrderByCreatedAtDesc(Long postId, Pageable pageable);

}
