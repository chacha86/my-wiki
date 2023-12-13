package com.korea.basic1.note.tag;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.korea.basic1.note.*;
import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/notes")
@RequiredArgsConstructor
public class NoteRestController {

    private final NoteService noteService;
    private final NotePageService notePageService;

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

    @Getter
    @Setter
    private static class NotePageResultDto {
        private List<NotePageDto> notePageDtoList;
        private NoteUIParam noteUIParam;
    }
    @RequestMapping("/{noteId}/pages")
    public String getPages(@PathVariable Long noteId, @RequestBody NoteUIParam noteUIParam) {
        List<NotePage> notePageList = notePageService.getNotePageListByNoteId(noteId);
        List<NotePageDto> notePageDtoList = notePageService.getNotePageDtoList(notePageList);
        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            NotePageResultDto notePageResultDto = new NotePageResultDto();

            notePageResultDto.setNotePageDtoList(notePageDtoList);
            notePageResultDto.setNoteUIParam(noteUIParam);

            jsonStr = objectMapper.writeValueAsString(notePageResultDto);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }

    @Getter
    @Setter
    private static class NotePageContentDto {
        private NotePageDto notePageDto;
        private NoteUIParam noteUIParam;
    }
    @RequestMapping("/pages/{notePageId}")
    public String getPageContent(@PathVariable Long notePageId, @RequestBody NoteUIParam noteUIParam) {
        NotePage notePage = notePageService.getNotePageById(notePageId);
        NotePageDto notePageDto = notePage.toDto();
        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            NotePageContentDto notePageContentDto = new NotePageContentDto();

            notePageContentDto.setNotePageDto(notePageDto);
            notePageContentDto.setNoteUIParam(noteUIParam);

            jsonStr = objectMapper.writeValueAsString(notePageContentDto);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }
}
