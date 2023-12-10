package com.korea.basic1.note.pageDetail;

import com.korea.basic1.note.page.NotePage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotePageDetailService {
    private final NotePageDetailRepository notePageDetailRepository;

    public NotePageDetail saveDefaultPageDetail() {
        NotePageDetail notePageDetail = NotePageDetail.builder()
                .content("")
                .build();
        return notePageDetailRepository.save(notePageDetail);
    }

    public NotePageDetail getNotePageDetailListByPage(NotePage notePage) {
        return notePageDetailRepository.findByNotePage(notePage);
    }

    public List<NotePageDetail> getNotePageDetailListByPageList(List<NotePage> pageList) {
        return notePageDetailRepository.findByNotePageIn(pageList);
    }


    public void delete(Long detailId) {
        notePageDetailRepository.deleteById(detailId);
    }

    public void deleteAll(List<NotePageDetail> detailList) {
        notePageDetailRepository.deleteAll(detailList);
    }
}
