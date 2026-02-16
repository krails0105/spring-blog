package com.example.blog.service;

import com.example.blog.entity.Tag;
import com.example.blog.repository.TagRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// TagService: 태그 관련 비즈니스 로직 담당
// PostService에서 이 서비스를 주입받아 태그 파싱 시 사용
@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    // 전체 태그 목록 조회 (REST API에서 사용)
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }

    // 이름으로 태그 조회 (기존 태그가 있는지 확인할 때 사용)
    public Optional<Tag> getTag(String name) {
        return tagRepository.findByName(name);
    }

    // 태그 저장 (새 태그 생성 시 사용)
    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

}
