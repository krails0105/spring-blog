package com.example.blog.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

// Spring 컨텍스트 없이 순수 단위 테스트
// MarkdownService는 DB나 Spring 기능에 의존하지 않으므로 직접 생성하여 테스트
class MarkdownServiceTest {

    private MarkdownService markdownService;

    @BeforeEach
    void setUp() {
        markdownService = new MarkdownService();
    }

    @Test
    @DisplayName("볼드 변환: **text** → <strong>text</strong>")
    void convertBold() {
        String html = markdownService.convertToHtml("**bold**");
        assertThat(html.trim()).isEqualTo("<p><strong>bold</strong></p>");
    }

    @Test
    @DisplayName("이탤릭 변환: *text* → <em>text</em>")
    void convertItalic() {
        String html = markdownService.convertToHtml("*italic*");
        assertThat(html.trim()).isEqualTo("<p><em>italic</em></p>");
    }

    @Test
    @DisplayName("제목 변환: # title → <h1>title</h1>")
    void convertHeading() {
        String html = markdownService.convertToHtml("# Hello");
        assertThat(html.trim()).isEqualTo("<h1>Hello</h1>");
    }

    @Test
    @DisplayName("코드 블록 변환: `code` → <code>code</code>")
    void convertInlineCode() {
        String html = markdownService.convertToHtml("`code`");
        assertThat(html.trim()).isEqualTo("<p><code>code</code></p>");
    }

    @Test
    @DisplayName("링크 변환: [text](url) → <a href='url'>text</a>")
    void convertLink() {
        String html = markdownService.convertToHtml("[Google](https://google.com)");
        assertThat(html.trim()).isEqualTo("<p><a href=\"https://google.com\">Google</a></p>");
    }

    @Test
    @DisplayName("빈 문자열 입력 시 빈 문자열 반환")
    void convertEmpty() {
        String html = markdownService.convertToHtml("");
        assertThat(html.trim()).isEmpty();
    }

    @Test
    @DisplayName("null 입력 시 빈 문자열 반환")
    void convertNull() {
        String html = markdownService.convertToHtml(null);
        assertThat(html.trim()).isEmpty();
    }
}
