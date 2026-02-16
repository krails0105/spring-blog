package com.example.blog.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 카테고리 생성 요청 DTO (클라이언트 → 서버)
// JSON 예시: {"name": "Java"}
@Setter
@Getter
@NoArgsConstructor
public class CategoryRequest {

    private String name;
}
