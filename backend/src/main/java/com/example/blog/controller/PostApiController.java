package com.example.blog.controller;

import com.example.blog.dto.PostRequest;
import com.example.blog.dto.PostResponse;
import com.example.blog.entity.Post;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// @RestController: @Controller + @ResponseBody. 모든 메서드의 반환값을 JSON으로 변환
// @RequestMapping("/api/posts"): 이 컨트롤러의 모든 API URL이 /api/posts로 시작
// 기존 PostController(Thymeleaf용)와 별도로, REST API 전용 컨트롤러
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostApiController {

    private final PostService postService;

    // GET /api/posts — 글 목록 조회 (검색 + 카테고리 필터 + 페이징)
    // Page<PostResponse>를 반환하면 글 목록 + 페이지 메타 정보(총 페이지 수 등)가 JSON에 포함됨
    @GetMapping
    public Page<PostResponse> listPosts(@RequestParam(required = false) String category,
        @RequestParam(required = false) String keyword,
        @RequestParam(defaultValue = "0") int page) {

        Page<Post> posts;
        int pageSize = 10;
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());

        if (keyword != null && !keyword.isBlank()) {
            posts = postService.searchPosts(keyword, pageable);
        }
        else if (category != null && !category.isBlank()) {
            posts = postService.getPostsByCategory(category, pageable);
        }
        else {
            posts = postService.getPosts(pageable);
        }
        // Page의 map(): 페이지 정보는 유지하면서 내용물(Post)만 PostResponse로 변환
        return posts.map(PostResponse::new);
    }

    // GET /api/posts/{id} — 글 상세 조회
    // ResponseEntity: HTTP 상태 코드를 직접 제어 (200 OK, 404 Not Found 등)
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = postService.getPost(id).orElse(null);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new PostResponse(post));
    }

    // POST /api/posts — 글 작성
    // @RequestBody: HTTP 요청 본문의 JSON을 PostRequest 객체로 변환 (Jackson이 처리)
    // 201 Created: 새 리소스가 성공적으로 생성되었음을 의미
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest) {
        PostResponse postResponse = postService.createPost(postRequest);
        System.out.println(postResponse);
        return ResponseEntity.status(HttpStatus.CREATED).body(postResponse);
    }

    // PUT /api/posts/{id} — 글 수정
    // @PathVariable로 수정할 글의 ID, @RequestBody로 수정할 내용을 받음
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long id, @RequestBody PostRequest postRequest) {
        PostResponse postResponse = postService.updatePost(id, postRequest);
        return ResponseEntity.ok(postResponse);
    }

    // DELETE /api/posts/{id} — 글 삭제
    // 204 No Content: 삭제 성공, 반환할 데이터 없음
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

}
