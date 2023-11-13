package com.korea.basic1.note;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.DoubleSummaryStatistics;
import java.util.List;

@Controller
@RequestMapping("note")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final NoteProcessingService noteProcessingService;
    @RequestMapping("/")
    public String index(Model model) {

        List<Note> noteList = noteService.getParentNoteList();
        if(noteList.isEmpty()) {
            return "redirect:add";
        }
        return "redirect:/note/" + noteList.get(0).getId();
    }

    @PostMapping("/add")
    public String add() {
        Note note = noteService.saveDefaultNote();
        return String.format("redirect:/note/%d/page/add", note.getId());
    }

    @PostMapping("/add-group")
    public String groupAdd(Long noteId) {
        Note note = noteProcessingService.saveGroupNotebook(noteId);
        return "redirect:/note/" + note.getId();
    }
    @RequestMapping("{noteId}")
    public String intro(Model model, @PathVariable("noteId") Long noteId, @RequestParam(defaultValue = "") String keyword) {
        Note note = noteService.getNoteById(noteId);

        if(note.getPageList().isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }
        NotePage firstNotePage = note.getPageList().get(0);

        return String.format("redirect:/note/%d/page/%d?keyword=%s", noteId, firstNotePage.getId(), URLEncoder.encode(keyword, StandardCharsets.UTF_8));

    }

    @GetMapping("delete/{noteId}")
    public String delete(@PathVariable Long noteId) {
        noteProcessingService.deleteNote(noteId);
        return "redirect:/note/";
    }

    @PostMapping("update/{noteId}")
    public String update(@PathVariable Long noteId, String noteName, HttpServletRequest req) {
        noteService.updateNoteName(noteId, noteName);
        String uri = req.getRequestURI();
        HttpSession session = req.getSession();

        String msg = "노트 이름이 변경되었습니다";
        session.setAttribute("resultMsg", msg);

        return "redirect:/note/" + noteId;
    }

    @PostMapping("move")
    public String move(Long moveTargetId, Long destinationId) {
        noteService.moveNoteTo(moveTargetId, destinationId);
        return "redirect:/note/" + moveTargetId;
    }

//    @GetMapping("{noteId}/page/{pageId}")
//    public String view(Model model, @PathVariable Long noteId, @PathVariable Long pageId) {
//
//        List<Note> noteList = noteService.getParentNoteList();
//        Note noteDetail = noteService.getNoteById(noteId);
//        NotePage pageDetail = notePageService.getNotePageById(pageId);
//
//        if(noteList.isEmpty()) {
//            return "redirect:/note/add";
//        }
//
//        if(pageDetail == null) {
//            return "redirect:/note/" + noteId + "/page/add";
//        }
//
//        model.addAttribute("noteList", noteList);
//        model.addAttribute("noteDetail", noteDetail);
//        model.addAttribute("notePageList", noteDetail.getPageList());
//        model.addAttribute("pageDetail", pageDetail);
//
//        return "note_list";
//    }
}
