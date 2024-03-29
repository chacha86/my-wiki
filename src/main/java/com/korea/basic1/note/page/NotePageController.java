package com.korea.basic1.note.page;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.*;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/note/{noteId}/page")
@RequiredArgsConstructor
public class NotePageController {

    private final NotePageService notePageService;
    private final NoteService noteService;
    private final NoteProcessingService noteProcessingService;
    private final NotePageDetailService notePageDetailService;

    @RequestMapping("/add")
    public String add(Model model, @PathVariable("noteId") Long noteId) {

        Note note = noteService.getNoteById(noteId);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        NotePage notePage = notePageService.saveDefaultNotePage(note, notePageDetail);
        return String.format("redirect:/note/%d/page/%d", noteId, notePage.getId());
    }

    @RequestMapping("/{pageId}")
    public String list(Model model, @PathVariable("noteId") Long noteId,
                       @PathVariable("pageId") Long pageId, @ModelAttribute NoteParam noteParam,
//                       @RequestParam(defaultValue = "{}") String noteUIParamJson,
                       HttpSession session){

        List<Note> noteList = noteService.getParentNoteList();
        Note note = noteService.getNoteById(noteId);
        noteParam.setNote(note);
        List<NotePage> notePageList = noteProcessingService.getNotePageListByNoteParam(noteParam);

        if (notePageList.isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }

        NotePage notePage = notePageService.getNotePageById(pageId);
        SearchedResult searchedResult = noteProcessingService.getSearchedNoteAndPageList(noteParam);

        NoteTemplateDto noteDto = new NoteTemplateDto();
        noteDto.setCurrentNote(note);
        noteDto.setParentList(noteList);
        noteDto.setChildren(note.getChildren());
        noteDto.setPageList(note.getPageList());
        List<Note> notCheckableList = noteService.collecNotCheckableNote(note, new ArrayList<>());
        noteDto.setNotCheckableList(notCheckableList);


        String resultMsg = (String) session.getAttribute("resultMsg");
        if (resultMsg != null) {
            model.addAttribute("resultMsg", resultMsg);
            session.removeAttribute("resultMsg");
        }
//        String flashNoteUIParamJson = (String) model.getAttribute("noteUIParamJson");
//
//        if (flashNoteUIParamJson != null) {
//            noteUIParamJson = flashNoteUIParamJson;
//        }
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        NoteUIParam noteUIParam = objectMapper.readValue(noteUIParamJson, NoteUIParam.class);
//
//        model.addAttribute("noteUIParam", noteUIParam);
        model.addAttribute("noteDto", noteDto);
        model.addAttribute("pageDetail", notePage);
        model.addAttribute("noteList", noteList);
        model.addAttribute("notePageList", notePageList);
        model.addAttribute("noteDetail", note);
        model.addAttribute("searchedResult", searchedResult);

        return "note_list";
    }

    @RequestMapping("update")
    public String update(@PathVariable("noteId") Long noteId, Long pageId, String title, @RequestParam(defaultValue = "") String content) {
        notePageService.updateNotePage(pageId, title, content);
        return String.format("redirect:/note/%d/page/%d", noteId, pageId);
    }

    //
//
    @RequestMapping("delete")
    public String delete(@PathVariable("noteId") Long noteId, Long pageId) {

        notePageService.delete(pageId);
        return String.format("redirect:/note/%d/page/%d", noteId, pageId);
    }
//
//    @RequestMapping("detail")
//    @ResponseBody
//    public String detail(int targetId) {
//        Article page = pagePageRepository.findById(targetId);
//
//        if (page == null) {
//            return "존재하지 않는 게시물입니다.";
//        } else {
//            page.setHit(page.getHit() + 1);
//            String jsonString = "";
//
//            try {
//                // ObjectMapper 인스턴스 생성
//                ObjectMapper mapper = new ObjectMapper();
//
//                // Java 객체를 JSON 문자열로 변환
//                 jsonString = mapper.writeValueAsString(page);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//
//            return jsonString;
//        }
//   }
//
//    @RequestMapping("search")
//    @ResponseBody
//    public ArrayList<Article> search(@RequestParam(defaultValue = "") String keyword) {
//        ArrayList<Article> searchedArticles = pagePageRepository.findByTitle(keyword);
//        return searchedArticles;
//    }
}