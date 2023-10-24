package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public String add() {
        Note note = Note.builder()
                .name("새노트")
                .createDate(LocalDateTime.now())
                .updateDate(LocalDateTime.now())
                .build();

        noteService.save(note);

        return String.format("redirect:/note/%d/page/add", note.getId());
    }

    @GetMapping("{noteId}/page/{pageId}")
    public String view(Model model, @PathVariable Long noteId, @PathVariable Long pageId) {

        List<Note> noteList = noteService.getNoteList();
        Note noteDetail = noteService.getNoteById(noteId);
        NotePage pageDetail = notePageService.getNotePageById(pageId);

        if(noteList.isEmpty()) {
            return "redirect:/note/add";
        }

        if(pageDetail == null) {
            return "redirect:/note/" + noteId + "/page/add";
        }

        model.addAttribute("noteList", noteList);
        model.addAttribute("noteDetail", noteDetail);
        model.addAttribute("notePageList", noteDetail.getPageList());
        model.addAttribute("pageDetail", pageDetail);

        return "note_list";
    }
}
