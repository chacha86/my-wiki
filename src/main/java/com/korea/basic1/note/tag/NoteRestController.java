package com.korea.basic1.note.tag;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.NoteTreeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/notes")
@RequiredArgsConstructor
public class NoteRestController {

    private final NoteService noteService;
    @RequestMapping("/")
    public String test() {
        List<NoteTreeDto> noteTree = noteService.buildNoteTreeDto();
        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            jsonStr = objectMapper.writeValueAsString(noteTree);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }

}
