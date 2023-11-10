package com.korea.basic1.note.pageDetail;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.QNote;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NoteRepositoryCustom {

    @Autowired
    JPAQueryFactory queryFactory;

    public Note findNoteById(Long id) {
        Note note1 = queryFactory.selectFrom(QNote.note)
                .where(QNote.note.id.eq(id))
                .fetchOne();

        assert note1 != null;
        System.out.println("note1 = " + note1.getName());

        return note1;
    }
}
