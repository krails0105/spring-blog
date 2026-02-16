package com.example.blog.service;

import com.vladsch.flexmark.ext.tables.TablesExtension;
import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.ast.Document;
import com.vladsch.flexmark.util.data.MutableDataSet;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MarkdownService {

    private final Parser parser;
    private final HtmlRenderer renderer;

    MarkdownService() {
        // 1. 옵션 설정
        MutableDataSet options = new MutableDataSet();
        options.set(Parser.EXTENSIONS, List.of(TablesExtension.create()));

        // 2. Parser와 Renderer 생성
        parser = Parser.builder(options).build();
        renderer = HtmlRenderer.builder(options).build();
    }

    public String convertToHtml(String markdown) {
        if (markdown == null) {
            return "";
        }
        Document document = this.parser.parse(markdown);

        // 3. Markdown → Document(AST) → HTML
        return this.renderer.render(document);
    }
}
