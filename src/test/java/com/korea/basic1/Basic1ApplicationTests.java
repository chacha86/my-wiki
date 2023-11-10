package com.korea.basic1;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.QNote;
import com.korea.basic1.note.page.QNotePage;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class Basic1ApplicationTests {

	@Autowired
	private JPAQueryFactory jpaQueryFactory;

	@Test
	@Transactional
	void contextLoads() {
//		List<Note> noteList = jpaQueryFactory.selectFrom(QNote.note).fetch();

		QNote note = QNote.note;
		QNotePage notePage = QNotePage.notePage;

		List<Note> noteList = jpaQueryFactory.selectFrom(note)
				.innerJoin(note.pageList, notePage).fetch();

		for (Note n : noteList) {
			System.out.println("note = " + n.getName());
		}
	}

}
