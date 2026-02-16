package com.example.blog.repository;

import com.example.blog.entity.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// Spring Data JPA가 메서드 이름을 분석하여 쿼리를 자동 생성
// findByName → SELECT * FROM category WHERE name = ?
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);
}

