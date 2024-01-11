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
import java.util.Map;

@RestController
@RequestMapping("api/notes")
@RequiredArgsConstructor
public class NoteRestController {

    private final NoteService noteService;
    private final NotePageService notePageService;
    private final NoteProcessingService noteProcessingService;

    @Getter
    @Setter
    private static class NoteResultDto {
        private Long noteId;
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
    private static class MoveNoteParamDto {
        private Long noteId;
        private NoteUIParam noteUIParam;
    }

    @RequestMapping("move/{noteId}")
    public String moveNote(@PathVariable("noteId") Long noteId) {
        List<NoteTreeDto> noteTreeForMove = noteService.buildNoteTreeDtoForMove(noteId);
        String jsonStr = null;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            NoteResultDto noteResultDto = new NoteResultDto();

            noteResultDto.setNoteId(noteId);
            noteResultDto.setNoteTree(noteTreeForMove);

            jsonStr = objectMapper.writeValueAsString(noteResultDto);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }

    @Getter
    @Setter
    private static class NotePageResultDto {
//        private Long noteId;
//        private Long pageId;
        private List<NotePageDto> notePageDtoList;
//        private NoteUIParam noteUIParam;
    }
    @Getter
    @Setter
    private static class PageListParamDto {
        private Long noteId;
        private Long pageId;
    }
    @RequestMapping("/{noteId}/pages")
    public String getPages(@PathVariable Long noteId) {
        List<NotePage> notePageList = notePageService.getNotePageListByNoteId(noteId);
        List<NotePageDto> notePageDtoList = notePageService.getNotePageDtoList(notePageList);
        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            NotePageResultDto notePageResultDto = new NotePageResultDto();

//            notePageResultDto.setNoteId(noteId);
//            notePageResultDto.setPageId(pageListParamDto.getPageId());
            notePageResultDto.setNotePageDtoList(notePageDtoList);
//            notePageResultDto.setNoteUIParam(noteUIParam);

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
    @RequestMapping("/delete/{noteId}")
    public String delete(@PathVariable Long noteId) {
        noteProcessingService.deleteNote(noteId);
        return "{\"msg\" : \"노트가 삭제되었습니다.\"}";
    }

    @RequestMapping("/add-group")
    public String addGroup() {
        Note note = noteProcessingService.saveGroupNotebook();
        return "{\"msg\" : \"그룹 노트가 생성되었습니다.\", \"noteId\" : " + note.getId() + "}";

    }

    @RequestMapping("/add-group/{noteId}")
    public String addGroup(@PathVariable Long noteId) {
        Note note = noteProcessingService.saveGroupNotebook(noteId);
        return "{\"msg\" : \"그룹 노트가 생성되었습니다.\", \"noteId\" : " + note.getId() + "}";
    }

    @RequestMapping("/add/{noteId}")
    public String add(@PathVariable Long noteId) {
        Note note = noteService.saveDefaultNote(noteId);
        return "{\"msg\" : \"노트가 생성되었습니다.\", \"noteId\" : " + note.getId() + "}";
    }

    @Getter
    @Setter
    private static class UpdateNoteNameParamDto {
        private String noteName;
    }

    @RequestMapping("/update/{noteId}")
    public String update(@PathVariable Long noteId, @RequestBody UpdateNoteNameParamDto updateNoteNameParamDto) {

        String noteName = updateNoteNameParamDto.getNoteName();
        System.out.println(noteName);
        noteService.updateNoteName(noteId, noteName);

        return "{\"msg\" : \"노트가 수정되었습니다.\"}";
    }

    @Getter
    @Setter
    private static class UpdateMoveNoteParamDto {
        private Long moveTargetId;
        private Long destinationId;
    }
    @RequestMapping("/update/move")
    public String move(@RequestBody UpdateMoveNoteParamDto updateMoveNoteParamDto) {
        noteService.moveNoteTo(updateMoveNoteParamDto.getMoveTargetId(), updateMoveNoteParamDto.getDestinationId());
        return "{\"msg\" : \"노트를 이동하였습니다.\"}";
    }

    @Getter
    @Setter
    private static class SearchParamDto {
        private String keyword;
    }
    @RequestMapping("/search")
    public String search(@RequestBody SearchParamDto searchParamDto) {
        NoteParam noteParam = new NoteParam();
        noteParam.setKeyword(searchParamDto.getKeyword());
        SearchedResult searchedResult = noteProcessingService.getSearchedNoteAndPageList(noteParam);

        String jsonStr = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            jsonStr = objectMapper.writeValueAsString(searchedResult);

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonStr;
    }
}
