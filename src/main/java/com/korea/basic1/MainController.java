package com.korea.basic1;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.NoteTreeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MainController {

    @GetMapping("/")
    public String index(Model model) {
        String test = "<h1 style='color:red;'>hihi</h1>";
        model.addAttribute("test", test);

        return "main";
    }

    @Autowired
    private NoteService noteService;

    @GetMapping("/api-test")
    @ResponseBody
    public String apiTest() throws JsonProcessingException {

        List<NoteTreeDto> noteTree = noteService.buildNoteTreeDto();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper.writeValueAsString(noteTree);
    }

    @GetMapping("/api-test2")
    public String apiTest2() {
        return "fetch_test";
    }

    @GetMapping("/api-test3")
    public String apiTest3() {
        return "test";
    }

    @PostMapping("array-test")
    @ResponseBody
    public ArrayList<String> arrayTest(@RequestParam("array") ArrayList<String> array) {
        for (String s : array) {
            System.out.println(s);
        }
        return array;
    }
}
