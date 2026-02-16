package com.example.blog.controller;

import com.example.blog.dto.CategoryRequest;
import com.example.blog.entity.Category;
import com.example.blog.service.CategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 카테고리 REST API 컨트롤러
// /api/categories 경로로 카테고리 목록 조회, 생성 API 제공
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryApiController {

    private final CategoryService categoryService;

    // GET /api/categories — 전체 카테고리 목록 조회
    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    // POST /api/categories — 카테고리 생성
    @PostMapping
    public ResponseEntity<Void> createCategory(@RequestBody CategoryRequest categoryRequest) {
        categoryService.save(categoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
