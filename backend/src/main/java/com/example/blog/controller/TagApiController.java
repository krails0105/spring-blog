package com.example.blog.controller;

import com.example.blog.entity.Tag;
import com.example.blog.service.TagService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 태그 REST API 컨트롤러
// /api/tags 경로로 태그 목록 조회 API 제공
@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagApiController {

    private final TagService tagService;

    // GET /api/tags — 전체 태그 목록 조회
    @GetMapping
    public List<Tag> getTags() {
        return tagService.getTags();
    }
}
