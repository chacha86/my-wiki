package com.korea.basic1.note;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByParentId(Long parentId);

    List<Note> findAllByNameContaining(String keyword);
}
