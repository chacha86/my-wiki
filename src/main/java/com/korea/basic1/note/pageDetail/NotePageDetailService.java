package com.korea.basic1.note.pageDetail;

import com.korea.basic1.note.page.NotePage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotePageDetailService {
    private final NotePageDetailRepository notePageDetailRepository;

    public NotePage saveAndGet(NotePage notePage) {
        NotePageDetail notePageDetail = NotePageDetail.builder()
                .content("")
                .notePage(notePage)
                .build();
        notePage.setNotePageDetail(notePageDetail);
        notePageDetailRepository.save(notePageDetail);

        return notePage;
    }
}
