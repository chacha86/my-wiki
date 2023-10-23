package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        throw new IllegalArgumentException("해당 노트페이지가 존재하지 않습니다. id=" + id);
    }
}
