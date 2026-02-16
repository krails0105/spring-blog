package com.example.blog.service;

import com.example.blog.entity.Category;
import com.example.blog.entity.Post;
import com.example.blog.entity.Tag;
import com.example.blog.repository.PostRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// @Service: 비즈니스 로직 담당. Controller와 Repository 사이에서 로직을 처리
// @RequiredArgsConstructor: final 필드를 파라미터로 받는 생성자를 자동 생성 (생성자 주입)
@Service
@RequiredArgsConstructor
public class PostService {

    // Spring이 PostRepository 구현체를 자동으로 주입 (Dependency Injection)
    private final PostRepository postRepository;
    private final CategoryService categoryService;
    private final TagService tagService;

    // 전체 글 목록 조회 (페이징)
    // Pageable: 몇 번째 페이지를, 몇 개씩 보여줄지 정보를 담은 객체
    // Page<Post>: 글 목록 + 전체 페이지 수, 현재 페이지 번호 등 메타 정보를 함께 반환
    public Page<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    // ID로 단건 조회. Optional로 반환 → 값이 없을 수도 있음을 명시
    public Optional<Post> getPost(Long id) {
        return postRepository.findById(id);
    }

    // 카테고리별 글 목록 조회 (페이징)
    // 카테고리 이름으로 Category 엔티티를 먼저 조회한 후, 해당 카테고리의 글 목록을 반환
    public Page<Post> getPostsByCategory(String categoryName, Pageable pageable) {
        Category category = categoryService.getCategory(categoryName).orElseThrow();
        return postRepository.findByCategory(category, pageable);
    }

    // 제목 또는 내용으로 글 검색 (페이징)
    // 같은 keyword를 두 번 넘기는 이유: Repository 메서드에서 Or 조건의 각 필드마다 파라미터가 필요
    public Page<Post> searchPosts(String keyword, Pageable pageable) {
        return postRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
    }

    // 글 저장 (생성 + 수정 모두 처리)
    // id가 null이면 새 글 → createdAt/updatedAt 모두 설정
    // id가 있으면 수정 → updatedAt만 갱신
    public Post savePost(Post post, String tagInput) {
        // [카테고리 처리] 폼에서 넘어온 category는 id만 있는 빈 껍데기(transient 객체)
        // DB에서 실제 관리 상태(managed) 엔티티를 조회해서 교체해야 JPA가 정상 동작
        // 카테고리를 선택하지 않았으면 null로 설정
        if (post.getCategory() != null && post.getCategory().getId() != null) {
            Category category = categoryService.getCategoryById(post.getCategory().getId()).orElse(null);
            post.setCategory(category);
        } else {
            post.setCategory(null);
        }

        // [태그 처리] 쉼표로 구분된 문자열(tagInput)을 파싱하여 Tag 엔티티 리스트로 변환
        // 이미 존재하는 태그는 DB에서 조회, 없으면 새로 생성하여 저장
        if (tagInput != null && !tagInput.isBlank()) {
            String[] tags = tagInput.split(",");

            List<Tag> parsedTags = new ArrayList<>();
            for (String tag : tags) {
                String name = tag.trim();
                Optional<Tag> existingTag = tagService.getTag(name);
                if (existingTag.isEmpty()) {
                    Tag newTag = new Tag();
                    newTag.setName(name);
                    parsedTags.add(tagService.save(newTag));
                } else {
                    parsedTags.add(existingTag.get());
                }
            }
            post.setTags(parsedTags);
        }

        // [시간 처리] 새 글이면 createdAt 설정, 수정이면 기존 createdAt 보존
        // 수정 시 폼에 createdAt이 없어서 null로 넘어오므로, DB에서 기존 값을 가져와야 함
        if (post.getId() == null) {
            post.setCreatedAt(LocalDateTime.now());
        } else {
            Post existPost = postRepository.findById(post.getId()).orElseThrow();
            post.setCreatedAt(existPost.getCreatedAt());
        }

        post.setUpdatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

}
