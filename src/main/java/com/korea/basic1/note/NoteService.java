package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public List<Note> getNoteList() {
        return noteRepository.findAll();
    }

    public List<Note> getParentNoteList() {
        return noteRepository.findByParentId(null);
    }
    public Note getNoteById(Long id) {
        Optional<Note> optional = noteRepository.findById(id);
        if(optional.isPresent()) {
            return optional.get();
        }
        return null;
    }
    public Note saveAndGet() {
        Note note = Note.builder()
                .name("새노트")
                .createDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .parent(null)
                .build();

        noteRepository.save(note);
        return note;
    }
}
