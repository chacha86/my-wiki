package com.korea.basic1.note.page;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/note/{noteId}/page")
@RequiredArgsConstructor
public class NotePageController {

    private final NotePageService notePageService;
    private final NoteService noteService;
    private final NotePageDetailService notePageDetailService;

    @RequestMapping("/add")
    public String add(Model model, @PathVariable("noteId") Long noteId) {

        Note note = noteService.getNoteById(noteId);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        NotePage notePage = notePageService.saveDefaultNotePage(note, notePageDetail);
        return String.format("redirect:/note/%d/page/%d", noteId, notePage.getId());
    }

    @RequestMapping("/{pageId}")
    public String list(Model model, @PathVariable("noteId") Long noteId, @PathVariable("pageId") Long pageId) {
        List<Note> noteList = noteService.getParentNoteList();
//        Note note = noteService.getNoChildNote(noteId);
        Note note = noteService.getNoteById(noteId);
        List<NotePage> notePageList = note.getPageList();

        if(notePageList.isEmpty()) {
            return String.format("redirect:/note/%d/page/add", noteId);
        }

        NotePage notePage = notePageService.getNotePageById(pageId);
        if(notePage == null) {
            notePage = notePageList.get(0);
        }

        model.addAttribute("pageDetail", notePage);
        model.addAttribute("noteList", noteList);
        model.addAttribute("notePageList", notePageList);
        model.addAttribute("noteDetail", note);

        return "note_list";
    }

    @RequestMapping("update")
    public String update(@PathVariable("noteId") Long noteId, Long pageId, String title, @RequestParam(defaultValue = "") String content) {
        notePageService.updateNotePage(pageId, title, content);
        return String.format("redirect:/note/%d/page/%d",noteId, pageId);
    }

    //
//
    @RequestMapping("delete")
    public String delete(@PathVariable("noteId") Long noteId, Long pageId) {

        notePageService.delete(pageId);
        return String.format("redirect:/note/%d/page/%d",noteId, pageId);
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
