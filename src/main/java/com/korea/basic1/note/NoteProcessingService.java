package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteProcessingService {
    private final NoteService noteService;
    private final NotePageService notePageService;
    private final NotePageDetailService notePageDetailService;

//    @Transactional
    @Transactional
    public void deleteNote(Long noteId) {
        Note note = noteService.getNoteById(noteId);
        deleteChildNoteRecursively(note);
        noteService.delete(note);
    }

    public void deleteChildNoteRecursively(Note note) {
        List<Note> children = note.getChildren();
        for (Note child : children) {
            deleteChildNoteRecursively(child);
        }
        deleteNotePageByNote(note);
        noteService.delete(note);
    }
    public void deleteNotePageByNote(Note note) {
        List<NotePage> pageList = note.getPageList();
        List<NotePageDetail> detailList = notePageDetailService.getNotePageDetailListByPageList(pageList);
        notePageDetailService.deleteAll(detailList);
        notePageService.deleteAll(pageList);
    }
    public Note saveGroupNotebook(Long noteId) {
        Note parent = noteService.getNoteById(noteId);
        Note child = noteService.saveGroupNotebook(parent);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        notePageService.saveDefaultNotePage(child, notePageDetail);
        return child;
    }
}
