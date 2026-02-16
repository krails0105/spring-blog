package com.example.blog.repository;

import com.example.blog.entity.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// findByName → SELECT * FROM tag WHERE name = ?
public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);
}
