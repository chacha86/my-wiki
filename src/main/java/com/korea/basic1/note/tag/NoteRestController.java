package com.korea.basic1.note.tag;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.NoteTreeDto;
import com.korea.basic1.note.NoteUIParam;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/notes")
@RequiredArgsConstructor
public class NoteRestController {

    private final NoteService noteService;

    @Getter
    @Setter
    private static class NoteResultDto {
        private List<NoteTreeDto> noteTree;
        private NoteUIParam noteUIParam;
    }
    @RequestMapping("")
    public String test(@RequestBody NoteUIParam noteUIParam) {

        List<NoteTreeDto> noteTree = noteService.buildNoteTreeDto();
        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            NoteResultDto noteResultDto = new NoteResultDto();

            noteResultDto.setNoteTree(noteTree);
            noteResultDto.setNoteUIParam(noteUIParam);

            jsonStr = objectMapper.writeValueAsString(noteResultDto);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }

}
