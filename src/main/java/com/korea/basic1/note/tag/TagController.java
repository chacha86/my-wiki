package com.korea.basic1.note.tag;

import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;
    private final NotePageService notePageService;

    @PostMapping("/add")
    public String add(String tagName, Long noteId, Long pageId) {

        NotePage page = notePageService.getNotePageById(pageId);
        tagService.create(tagName, page);
        return "redirect:/note/" + noteId + "/page/" + pageId;
    }
}
