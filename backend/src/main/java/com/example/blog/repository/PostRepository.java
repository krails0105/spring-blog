package com.example.blog.repository;

import com.example.blog.entity.Category;
import com.example.blog.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository<Post, Long>을 상속하면 구현체 없이 기본 CRUD 메서드를 사용 가능:
// findAll(), findById(), save(), deleteById() 등
// 제네릭: 첫 번째 = 엔티티 타입(Post), 두 번째 = 기본 키 타입(Long)
public interface PostRepository extends JpaRepository<Post, Long> {

    // 카테고리별 글 목록 조회 (페이징 포함)
    // Spring Data JPA 쿼리 메서드: findBy + 필드명 → WHERE category = ? 쿼리 자동 생성
    // Pageable을 파라미터에 추가하면 페이징 처리가 자동으로 적용됨
    Page<Post> findByCategory(Category category, Pageable pageable);

    // 제목 또는 내용에 키워드가 포함된 글 검색 (페이징 포함)
    // Containing → SQL의 LIKE '%keyword%' (부분 일치 검색)
    // Or → 두 조건 중 하나만 맞아도 결과에 포함
    // 주의: Or 조건에서는 각 조건마다 별도 파라미터가 필요 (같은 값을 두 번 넘겨야 함)
    Page<Post> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword, Pageable pageable);
}
