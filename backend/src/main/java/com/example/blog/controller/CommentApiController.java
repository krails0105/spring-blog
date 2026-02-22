package com.example.blog.controller;

import com.example.blog.dto.CommentDeleteRequest;
import com.example.blog.dto.CommentRequest;
import com.example.blog.dto.CommentResponse;
import com.example.blog.entity.Comment;
import com.example.blog.service.CommentService;
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

// @RestController: JSON 응답을 반환하는 REST API 컨트롤러
// @RequestMapping("/api"): 모든 엔드포인트의 공통 접두사
// @RequiredArgsConstructor: final 필드(commentService)를 주입받는 생성자 자동 생성
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentApiController {

    private final CommentService commentService;

    // 댓글 목록 조회: GET /api/posts/{postId}/comments?page=0
    // 게시글에 속한 댓글을 페이지 단위로 반환 (한 페이지당 5개, 최신순)
    // ResponseEntity 없이 직접 반환 → Spring이 자동으로 200 OK 처리
    @GetMapping("/posts/{postId}/comments")
    public Page<CommentResponse> listComments(@PathVariable Long postId, @RequestParam(defaultValue = "0") int page) {
        int pageSize = 5;
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
        Page<Comment> comments = commentService.getComments(postId, pageable);
        // .map(CommentResponse::new): Page 안의 각 Comment 엔티티를 CommentResponse DTO로 변환
        return comments.map(CommentResponse::new);
    }

    // 댓글 작성: POST /api/posts/{postId}/comments
    // 인증 불필요 - 닉네임/비밀번호를 요청 본문에 포함
    // 201 Created 반환 (새 리소스 생성이므로 200이 아닌 201이 적절)
    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<CommentResponse> createComment(@PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
        Comment comment = commentService.saveComment(postId, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(new CommentResponse(comment));
    }

    // 댓글 수정: PUT /api/comments/{id}
    // 비밀번호 확인 후 내용 수정 (Service에서 비밀번호 검증)
    @PutMapping("/comments/{id}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable Long id, @RequestBody CommentRequest commentRequest) {
        Comment comment = commentService.updateComment(id, commentRequest);
        return ResponseEntity.ok(new CommentResponse(comment));
    }

    // 댓글 삭제: DELETE /api/comments/{id}
    // 비밀번호 확인 후 삭제 (Service에서 비밀번호 검증)
    // 204 No Content 반환 (삭제 성공 시 응답 본문 없음)
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id, @RequestBody CommentDeleteRequest commentDeleteRequest) {
        commentService.deleteComment(id, commentDeleteRequest.getPassword());
        return ResponseEntity.noContent().build();
    }
}
