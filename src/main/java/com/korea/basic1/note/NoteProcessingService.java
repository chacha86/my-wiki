package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import com.korea.basic1.note.tag.Tag;
import com.korea.basic1.note.tag.TagService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteProcessingService {
    private final NoteService noteService;
    private final NotePageService notePageService;
    private final NotePageDetailService notePageDetailService;
    private final TagService tagService;

    //    @Transactional
    @Transactional
    @CachePut(value = "noteList")
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
    public Note saveGroupNotebook() {
        Note child = noteService.saveGroupNotebook(null);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        notePageService.saveDefaultNotePage(child, notePageDetail);
        return child;
    }
    @CachePut(value = "noteList")
    public Note saveGroupNotebook(Long noteId) {
        Note parent = noteService.getNoteById(noteId);
        return noteService.saveGroupNotebook(parent);
    }

    public SearchedResult getSearchedNoteAndPageList(NoteParam noteParam) {
        String keyword = noteParam.getKeyword();
        List<Note> noteList = noteService.getNoteListByKeyword(keyword);
        Sort sort = Sort.by(noteParam.getSortDirection(), noteParam.getSort());
        List<NotePage> pageList = notePageService.getNotePageListByKeyword(keyword, sort);

        return new SearchedResult(keyword, noteList, pageList);
    }

    public List<NotePage> getNotePageListByNoteParam(NoteParam noteParam) {
        Note note = noteParam.getNote();
        Sort sort = Sort.by(noteParam.getSortDirection(), noteParam.getSort());
        return notePageService.getNotePageListByNoteId(note.getId(), sort);
    }

    public List<Tag> getTagListByNotePage(NotePage page) {
        return tagService.getTagListByNotePage(page);
    }
}