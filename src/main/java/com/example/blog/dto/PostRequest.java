package com.example.blog.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 글 작성/수정 요청 DTO (클라이언트 → 서버)
// JSON 요청 본문을 Java 객체로 변환하기 위한 그릇
// @NoArgsConstructor + @Setter: Jackson이 JSON → 객체 변환 시 필요
//   1) 기본 생성자로 빈 객체 생성 → 2) setter로 JSON 필드값 채움
@Setter
@Getter
@NoArgsConstructor
public class PostRequest {

    private String title;
    private String content;
    // 카테고리는 ID로 받음 (프론트에서 드롭다운 선택값)
    private Long categoryId;
    // 태그는 이름 리스트로 받음 (예: ["Java", "Spring"])
    private List<String> tagNames;
}
