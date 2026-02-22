package com.example.blog.service;

import com.example.blog.dto.CommentRequest;
import com.example.blog.entity.Comment;
import com.example.blog.entity.Post;
import com.example.blog.repository.CommentRepository;
import com.example.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// @Service: Spring이 이 클래스를 서비스 빈으로 등록
// @RequiredArgsConstructor: final 필드를 파라미터로 받는 생성자를 자동 생성 (생성자 주입)
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    // 특정 게시글의 댓글 목록을 페이징하여 조회
    public Page<Comment> getComments(Long postId, Pageable pageable) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId, pageable);
    }

    // 댓글 작성: 게시글 ID로 Post를 찾고, Comment에 연결하여 저장
    public Comment saveComment(Long postId, CommentRequest commentRequest) {
        // 게시글이 존재하는지 확인 (없으면 NoSuchElementException 발생)
        Post post = postRepository.findById(postId).orElseThrow();

        // DTO → 엔티티 변환: Request에서 받은 값을 Comment 엔티티에 세팅
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setAuthor(commentRequest.getAuthor());
        comment.setPassword(commentRequest.getPassword());
        comment.setPost(post);
        // save() 호출 시 @PrePersist에 의해 createdAt/updatedAt이 자동 설정됨
        return commentRepository.save(comment);
    }

    // 댓글 수정: 비밀번호 확인 후 내용 변경
    public Comment updateComment(Long id, CommentRequest commentRequest) {
        Comment comment = commentRepository.findById(id).orElseThrow();

        // 비밀번호가 일치하지 않으면 예외 발생 → 수정 불가
        if (!comment.getPassword().equals(commentRequest.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 비밀번호 확인 후 내용만 수정 (author, password는 변경하지 않음)
        comment.setContent(commentRequest.getContent());
        // save() 호출 시 @PreUpdate에 의해 updatedAt이 자동 갱신됨
        return commentRepository.save(comment);
    }

    // 댓글 삭제: 비밀번호 확인 후 삭제
    public void deleteComment(Long id, String password) {
        Comment comment = commentRepository.findById(id).orElseThrow();

        // 비밀번호가 일치하지 않으면 예외 발생 → 삭제 불가
        if (!comment.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        commentRepository.deleteById(id);
    }
}
