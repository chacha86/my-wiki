package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public List<Note> getNoteList() {
        return noteRepository.findAll();
    }

    @CachePut(value = "noteList")
    public List<Note> getParentNoteList() {
        return noteRepository.findByParentId(null);
    }

    public Note getNoteById(Long id) {
        Optional<Note> optional = noteRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new IllegalArgumentException("해당 노트는 존재하지 않습니다.");
    }

    public Note getNoChildNote(Long id) {
        Note note = getNoteById(id);
        if (note.getChildren().isEmpty()) {
            return note;
        }

        return getNoteById(id + 1);
    }

    public Note getDefaultNote() {

        return Note.builder()
                .name("새노트")
                .createDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .parent(null)
                .groupYn(0)
                .build();
    }

    @CachePut(value = "noteList")
    public Note saveDefaultNote() {
        Note note = getDefaultNote();
        return noteRepository.save(note);
    }

    @CachePut(value = "noteList")
    public Note saveDefaultNote(Long noteId) {
        Note parent = getNoteById(noteId);
        Note note = getDefaultNote();
        note.setParent(parent);
        return noteRepository.save(note);
    }

    public Note getDefaultNotebook() {
        Note note = new Note();
        note.setName("새노트");
        note.setCreateDate(LocalDateTime.now());
        note.setUpdateDate(LocalDateTime.now());
        return noteRepository.save(note);
    }

    public Note saveGroupNotebook(Note parent) {
        Note child = getDefaultNotebook();
        child.setParent(parent);
        child.setGroupYn(1);
        return noteRepository.save(child);
    }

    public void delete(Note note) {
        noteRepository.delete(note);
    }

    public Note save(Note note) {
        return noteRepository.save(note);
    }

    public void deleteChild(Note note) {
        List<Note> children = note.getChildren();
        for (Note child : children) {
            deleteChild(child);
            delete(child);
        }
    }

    public List<Note> collecNotCheckableNote(Note standard, List<Note> notCheckableList) {
        notCheckableList.add(standard);
        for (Note note : standard.getChildren()) {
            collecNotCheckableNote(note, notCheckableList);
        }

        return notCheckableList;
    }

    @CachePut(value = "noteList")
    public void updateNoteName(Long noteId, String noteName) {
        Note note = getNoteById(noteId);
        if (note == null) {
            new IllegalArgumentException("해당 노트는 존재하지 않습니다.");
        } else {
            note.setName(noteName);
            noteRepository.save(note); // save는 ID가 있으면 update, ID가 없으면 insert
        }
    }

    public void moveNoteTo(Long moveTargetId, Long destinationId) {
        Note target = getNoteById(moveTargetId);
        target.setParent(getNoteById(destinationId));
        noteRepository.save(target);
    }

    public List<Note> getNoteListByKeyword(String keyword) {
        return noteRepository.findAllByNameContaining(keyword);
    }

    public List<NoteTreeDto> buildNoteTreeDto() {
        List<NoteTreeDto> parentNoteList = new ArrayList<>();
        for (Note parentNote : getParentNoteList()) {
            NoteTreeDto havingChildrenNoteTreeDto = getHavingChildrenNoteTreeDto(parentNote);
            parentNoteList.add(havingChildrenNoteTreeDto);
        }

        return parentNoteList;
    }

    public NoteTreeDto getHavingChildrenNoteTreeDto(Note parent) {
        NoteTreeDto noteTreeDto = transformNoteToDto(parent);
        if (parent.getChildren().isEmpty()) {
            return noteTreeDto;
        }

        for (Note childNote : parent.getChildren()) {
            NoteTreeDto childNoteDto = getHavingChildrenNoteTreeDto(childNote);
            noteTreeDto.getChildren().add(childNoteDto);
        }

        return noteTreeDto;
    }

    public NoteTreeDto transformNoteToDto(Note note) {
        return NoteTreeDto.builder()
                .id(note.getId())
                .name(note.getName())
                .children(new ArrayList<>())
                .groupYn(note.getGroupYn())
                .build();
    }

//    private NoteTreeDto transformNoteToTreeDto(Note note) {
//        NoteTreeDto noteTreeDto = NoteTreeDto.builder()
//                .id(note.getId())
//                .name(note.getName())
//                .build();
//    }
}