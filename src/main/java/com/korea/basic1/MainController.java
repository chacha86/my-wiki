package com.korea.basic1;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {
    private final  NoteService noteService;

    @RequestMapping("/")
    public String main(Model model) {

        List<Note> noteList = noteService.getParentNoteList();
        if (noteList.isEmpty()) {
            return "redirect:add";
        }
        return "redirect:/note/" + noteList.get(0).getId();
    }
}
