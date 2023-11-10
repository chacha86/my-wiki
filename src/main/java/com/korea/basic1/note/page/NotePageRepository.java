package com.korea.basic1.note.page;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotePageRepository extends JpaRepository<NotePage, Long> {

    List<NotePage> findByTitleContaining(String keyword, Sort sort);

    List<NotePage> findByNoteId(Long id, Sort sort);
}
