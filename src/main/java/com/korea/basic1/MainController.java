package com.korea.basic1;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.page.NotePage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainController {
    private final  NoteService noteService;

    @RequestMapping("/")
    public String main(Model model) {
        return "note_list";
    }

    @RequestMapping("/async")
    public String async() {
        return "async";
    }

    @GetMapping("/file-test")
    public String fileTest() {
    	return "file_test";
    }

    @PostMapping("/file-test")
    @ResponseBody
    public String fileTestPost(@RequestParam("file") MultipartFile file) {
        System.out.println(file.getOriginalFilename());
    	return "ok";
    }

}
