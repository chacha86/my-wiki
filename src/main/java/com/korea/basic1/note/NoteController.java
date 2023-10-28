package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("note")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final NotePageService notePageService;
    @GetMapping("/add")
    public String add(int gb) {
        Note note = noteService.saveAndGet(gb);
        return String.format("redirect:/note/%d/page/add", note.getId());
    }

    @GetMapping("{noteId}")
    public String intro(Model model, @PathVariable("noteId") Long noteId) {
        Note note = noteService.getNoteById(noteId);
        if(note.getPageList().isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }
        NotePage firstNotePage = note.getPageList().get(0);

        return String.format("redirect:/note/%d/page/%d", noteId, firstNotePage.getId());

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
