package com.korea.basic1.note.tag;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteProcessingService;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pages")
@RequiredArgsConstructor
public class NotePageRestController {

    private final NoteService noteService;
    private final NotePageService notePageService;
    private final NotePageDetailService notePageDetailService;

    @RequestMapping("/add/{noteId}")
    public String add(@PathVariable Long noteId) {
        Note note = noteService.getNoteById(noteId);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        NotePage notePage = notePageService.saveDefaultNotePage(note, notePageDetail);

        return "{\"msg\" : \"페이지가 생성되었습니다.\", \"noteId\" : " + notePage.getId() + "}";
    }
    @RequestMapping("/delete/{pageId}")
    public String delete(@PathVariable Long pageId) {
        notePageService.delete(pageId);
        return "{\"msg\" : \"노트가 삭제되었습니다.\"}";
    }
}
