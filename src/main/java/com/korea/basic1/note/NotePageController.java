package com.korea.basic1.note;

import com.korea.basic1.note.NotePage;
import com.korea.basic1.note.NotePageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/note/{noteId}/page")
public class NotePageController {

    private enum DetailMode {
        EDIT,
        VIEW
    }


    @Autowired
    NotePageRepository notePageRepository;

    @Autowired
    NoteRepository noteRepository;
    @RequestMapping("/test")
    public String test() {
        return "ttt";
    }

    @RequestMapping("/add")
    public String add(Model model, @PathVariable("noteId") Long noteId) {

        Note note = noteRepository.findById(noteId).get();
        NotePage notePage = NotePage.builder()
                .title("제목")
                .content("")
                .hit(0)
                .createDate(LocalDateTime.now())
                .note(note)
                .build();
        notePageRepository.save(notePage); // save -> ID가 없으면 insert, ID가 있으면 update
        return String.format("redirect:/note/%d/page/%d", noteId, notePage.getId());
    }

    @RequestMapping("/{pageId}")
    public String list(Model model, @PathVariable("noteId") Long noteId, @PathVariable("pageId") Long pageId) {
        List<NotePage> notePageList = notePageRepository.findAll();

        if(notePageList.isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }

        Optional<NotePage> op = notePageRepository.findById(pageId);
        NotePage notePage = null;
        if (op.isPresent()) {
            notePage = op.get();
        } else {
            notePage = notePageList.get(0);
        }
        model.addAttribute("pageDetail", notePage);
        model.addAttribute("notePageList", notePageList);

        return "note_list";
    }

    @RequestMapping("update")
    public String update(Long pageId, String title, @RequestParam(defaultValue = "") String content) {

        Optional<NotePage> op = notePageRepository.findById(pageId);
        NotePage notePage = op.get();
        if (notePage == null) {
            new IllegalArgumentException("해당 게시물은 존재하지 않습니다.");
        } else {
            notePage.setTitle(title);
            notePage.setContent(content);
            notePageRepository.save(notePage); // save는 ID가 있으면 update, ID가 없으면 insert
        }

        return String.format("redirect:/note/page/%d", pageId);
    }

    //
//
    @RequestMapping("delete")
    public String delete(Long pageId) {
        System.out.println("pageId = " + pageId);
        Optional<NotePage> op = notePageRepository.findById(pageId);
        NotePage notePage = null;
        if (op.isPresent()) {
            notePage = op.get();
        } else {
            throw new RuntimeException();
        }
        notePageRepository.delete(notePage);

        return "redirect:/note/page/" + pageId;
    }
//
//    @RequestMapping("detail")
//    @ResponseBody
//    public String detail(int targetId) {
//        Article page = pagePageRepository.findById(targetId);
//
//        if (page == null) {
//            return "존재하지 않는 게시물입니다.";
//        } else {
//            page.setHit(page.getHit() + 1);
//            String jsonString = "";
//
//            try {
//                // ObjectMapper 인스턴스 생성
//                ObjectMapper mapper = new ObjectMapper();
//
//                // Java 객체를 JSON 문자열로 변환
//                 jsonString = mapper.writeValueAsString(page);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//
//            return jsonString;
//        }
//   }
//
//    @RequestMapping("search")
//    @ResponseBody
//    public ArrayList<Article> search(@RequestParam(defaultValue = "") String keyword) {
//        ArrayList<Article> searchedArticles = pagePageRepository.findByTitle(keyword);
//        return searchedArticles;
//    }
}
