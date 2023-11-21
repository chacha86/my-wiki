package com.korea.basic1.note;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("note")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final NoteProcessingService noteProcessingService;

    @PostMapping("/add")
    public String add() {
        Note note = noteService.saveDefaultNote();
        return String.format("redirect:/note/%d/page/add", note.getId());
    }

    @GetMapping("/add/{noteId}")
    public String add(@PathVariable Long noteId) {
        Note note = noteService.saveDefaultNote(noteId);
        return String.format("redirect:/note/%d/page/add", note.getId());
    }
    @GetMapping("/add-group/{noteId}")
    public String groupAdd(@PathVariable Long noteId) {
        Note note = noteProcessingService.saveGroupNotebook(noteId);
        return "redirect:/note/" + note.getId();
    }

    @GetMapping("{noteId}")
    public String intro(Model model, @PathVariable("noteId") Long noteId, @RequestParam(required = false) String noteUIParamJson,
                        RedirectAttributes redirectAttributes) throws JsonProcessingException {

        Note note = noteService.getNoteById(noteId);

//        ObjectMapper objectMapper = new ObjectMapper();
//        NoteUIParam noteUIParamObj = null;
//        noteUIParamObj = objectMapper.readValue(noteUIParam, NoteUIParam.class);

        redirectAttributes.addFlashAttribute("noteUIParamJson", noteUIParamJson);

        if (note.getPageList().isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }
        NotePage firstNotePage = note.getPageList().get(0);

        return String.format("redirect:/note/%d/page/%d", noteId, firstNotePage.getId());

    }

    @GetMapping("delete/{noteId}")
    public String delete(@PathVariable Long noteId) {
        noteProcessingService.deleteNote(noteId);
        return "redirect:/";
    }

    @PostMapping("update/{noteId}")
    public String update(@PathVariable Long noteId, String noteName) {
        noteService.updateNoteName(noteId, noteName);
        return "redirect:/note/" + noteId;
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
