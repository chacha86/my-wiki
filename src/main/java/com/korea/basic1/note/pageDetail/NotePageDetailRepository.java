package com.korea.basic1.note.pageDetail;

import com.korea.basic1.note.page.NotePage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotePageDetailRepository extends JpaRepository<NotePageDetail, Long> {
    NotePageDetail findByNotePage(NotePage notePage);

    List<NotePageDetail> findByNotePageIn(List<NotePage> pageList);
}
