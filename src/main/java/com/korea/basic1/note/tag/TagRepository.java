package com.korea.basic1.note.tag;


import com.korea.basic1.note.page.NotePage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByNotePage(NotePage page);
}
