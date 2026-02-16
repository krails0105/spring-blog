package com.example.blog.service;

import com.example.blog.dto.CategoryRequest;
import com.example.blog.entity.Category;
import com.example.blog.repository.CategoryRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// CategoryService: 카테고리 관련 비즈니스 로직 담당
// PostService에서 이 서비스를 주입받아 사용 (Service → Service 의존)
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // 전체 카테고리 목록 조회 (글 작성 폼의 드롭다운에 사용)
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    // 이름으로 카테고리 조회 (카테고리별 글 필터링에 사용)
    public Optional<Category> getCategory(String name) {
        return categoryRepository.findByName(name);
    }

    // ID로 카테고리 조회 (폼에서 넘어온 category.id로 DB의 관리 상태 엔티티를 가져올 때 사용)
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    // [REST API용] 카테고리 생성 (중복 방지)
    // 같은 이름의 카테고리가 이미 존재하면 생성하지 않음
    public Category save(CategoryRequest categoryRequest) {
        Category category = getCategory(categoryRequest.getName()).orElse(null);
        if (category != null) {
            return category;
        }
        Category newCategory = new Category();
        newCategory.setName(categoryRequest.getName());
        return categoryRepository.save(newCategory);
    }
}
