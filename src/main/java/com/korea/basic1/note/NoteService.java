package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public List<Note> getNoteList() {
        return noteRepository.findAll();
    }

    public Note getNoteById(Long id) {
        Optional<Note> optional = noteRepository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }
        throw new IllegalArgumentException("해당 노트가 존재하지 않습니다. id=" + id);
    }

    public void save(Note note) {
        noteRepository.save(note);
    }
}
