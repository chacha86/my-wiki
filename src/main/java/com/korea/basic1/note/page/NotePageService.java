package com.korea.basic1.note.page;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NotePageDto;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotePageService {
    private final NotePageRepository notePageRepository;

    public List<NotePage> getNotePageList() {
        return notePageRepository.findAll();
    }

    public NotePage getNotePageById(Long id) {
        Optional<NotePage> optional = notePageRepository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    public void delete(Long pageId) {
        notePageRepository.deleteById(pageId);
    }

    public NotePage saveDefaultNotePage(Note note, NotePageDetail notePageDetail) {
        NotePage notePage = NotePage.builder()
                .title("제목")
                .hit(0)
                .createDate(LocalDateTime.now())
                .note(note)
                .notePageDetail(notePageDetail)
                .build();
        return notePageRepository.save(notePage);
    }

    public void updateNotePage(Long pageId, String title, String content) {
        NotePage notePage = getNotePageById(pageId);
        if (notePage == null) {
            new IllegalArgumentException("해당 게시물은 존재하지 않습니다.");
        } else {
            notePage.setTitle(title);
            notePage.getNotePageDetail().setContent(content);
            notePageRepository.save(notePage); // save는 ID가 있으면 update, ID가 없으면 insert
        }
    }

    public void deleteAll(List<NotePage> notePageList) {
        notePageRepository.deleteAll(notePageList);
    }

    public List<NotePageDto> getNotePageDtoListByKeyword(String keyword, Sort sort) {
        List<NotePage> notePageList = getNotePageListByKeyword(keyword, sort);
        List<NotePageDto> notePageDtoList = new ArrayList<>();
        for (NotePage notePage : notePageList) {
            NotePageDto notePageDto = notePage.toDto();
            notePageDto.setNotePageDetailDto(notePage.getNotePageDetail().toDto());
            notePageDtoList.add(notePageDto);
        }
        return notePageDtoList;
    }
    public List<NotePage> getNotePageListByKeyword(String keyword, Sort sort) {
        return notePageRepository.findByTitleContaining(keyword, sort);
    }

    public List<NotePage> getNotePageListByNoteId(Long id, Sort sort) {
        return notePageRepository.findByNoteId(id, sort);
    }

    public List<NotePage> getNotePageListByNoteId(Long id) {
        return notePageRepository.findByNoteId(id);
    }

    public List<NotePageDto> getNotePageDtoList(List<NotePage> notePageList) {

        List<NotePageDto> notePageDtoList = new ArrayList<>();
        for (NotePage notePage : notePageList) {
            notePage.getNotePageDetail().toDto();
            notePageDtoList.add(notePage.toDto());
        }

        return notePageDtoList;
    }
}