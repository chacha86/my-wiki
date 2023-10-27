package com.korea.basic1.note.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("group")
@RequiredArgsConstructor
public class NoteGroupController {
    private final NoteGroupService noteGroupService;

    @GetMapping("/note/group")
    public String noteGroup() {
        return "note/group";
    }
}
