package com.korea.basic1.note;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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

        return "redirect:/note/list";
    }

    @GetMapping("/list")
    public String list(Model model) {
        List<Note> noteList = noteService.getNoteList();
        if(noteList.isEmpty()) {
            return "redirect:/note/add";
        }
        List<NotePage> notePageList = notePageService.getNotePageList();

        if(notePageList.isEmpty()) {
            return "redirect:/note/page/add";
        }
        model.addAttribute("notePageList", notePageList);
        model.addAttribute("noteList", noteList);
        model.addAttribute("noteDetail", noteList.get(0));
        model.addAttribute("pageDetail", notePageList.get(0));
        System.out.println("hihih");

        return "note_list";
    }
}
