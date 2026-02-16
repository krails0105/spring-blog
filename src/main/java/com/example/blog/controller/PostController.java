package com.example.blog.controller;

import com.example.blog.entity.Post;
import com.example.blog.service.CategoryService;
import com.example.blog.service.MarkdownService;
import com.example.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

// @Controller: 웹 요청을 처리하는 컨트롤러. 반환값은 Thymeleaf 템플릿 이름
@Controller
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CategoryService categoryService;
    private final MarkdownService markdownService;

    // GET /posts → 글 목록 페이지 (검색 + 카테고리 필터 + 페이징 통합 처리)
    // Model에 데이터를 담으면 Thymeleaf 템플릿에서 사용 가능
    // @RequestParam(required = false): 쿼리 파라미터가 없어도 에러 안 남
    // @RequestParam(defaultValue = "0"): page 파라미터가 없으면 기본값 0 (첫 페이지)
    // 하나의 메서드에서 3가지 경우를 처리:
    //   /posts                → 전체 글 목록
    //   /posts?category=Java  → 카테고리별 필터링
    //   /posts?keyword=spring → 키워드 검색
    @GetMapping("/posts")
    public String listPosts(@RequestParam(required = false) String category,
        @RequestParam(required = false) String keyword,
        @RequestParam(defaultValue = "0") int page,
        Model model) {

        // PageRequest.of(페이지 번호, 페이지 크기, 정렬 기준)
        // 페이지 번호는 0부터 시작. Sort.by("createdAt").descending() → 최신 글이 먼저
        Page<Post> posts;
        int pageSize = 10;
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());

        // 검색 키워드가 있으면 검색, 카테고리가 있으면 필터링, 둘 다 없으면 전체 조회
        if (keyword != null && !keyword.isBlank()) {
            posts = postService.searchPosts(keyword, pageable);
        }
        else if (category != null && !category.isBlank()) {
            posts = postService.getPostsByCategory(category, pageable);
        }
        else {
            posts = postService.getPosts(pageable);
        }
        model.addAttribute("posts", posts);
        return "posts/list";
    }

    // GET /posts/{id} → 글 상세 페이지
    // @PathVariable: URL의 {id} 값을 메서드 파라미터로 받음
    // orElseThrow(): 글이 없으면 예외 발생 (404 대신 500 에러)
    @GetMapping("/posts/{id}")
    public String postDetail(@PathVariable Long id, Model model){
        Post post = postService.getPost(id).orElseThrow();
        String html = markdownService.convertToHtml(post.getContent());
        model.addAttribute("post", post);
        model.addAttribute("contentHtml", html);
        return "posts/detail";
    }

    // GET /posts/new → 작성 폼 페이지
    @GetMapping("/posts/new")
    public String createForm(Model model) {
        model.addAttribute("categories", categoryService.getCategories());
        return "posts/create";
    }

    // POST /posts/new → 작성 처리
    // Spring이 폼의 name="title", name="content"를 Post 객체의 필드에 자동 바인딩
    // tagInput은 별도 @RequestParam으로 받음 (Post 엔티티에 tagInput 필드가 없으므로)
    // 처리 후 redirect로 목록 페이지로 이동 (PRG 패턴 - 새로고침 시 중복 저장 방지)
    @PostMapping("/posts/new")
    public String createPost(@RequestParam(required = false) String tagInput, Post post) {
        postService.savePost(post, tagInput);
        return "redirect:/posts";
    }

    // GET /posts/{id}/edit → 수정 폼 페이지 (기존 데이터를 폼에 채워서 보여줌)
    @GetMapping("/posts/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        Post post = postService.getPost(id).orElseThrow();
        model.addAttribute(post);
        model.addAttribute("categories", categoryService.getCategories());
        return "posts/edit";
    }

    // POST /posts/{id}/edit → 수정 처리
    // 폼에서 넘어온 데이터에는 id가 없으므로, URL의 id를 직접 세팅해야 함
    @PostMapping("/posts/{id}/edit")
    public String updatePost(@PathVariable Long id, @RequestParam(required = false) String tagInput, Post post) {
        post.setId(id);
        postService.savePost(post, tagInput);
        return "redirect:/posts";
    }

    // POST /posts/{id}/delete → 삭제 처리
    @PostMapping("/posts/{id}/delete")
    public String deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return "redirect:/posts";
    }

}
