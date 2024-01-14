package com.korea.basic1.note.tag;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.NoteProcessingService;
import com.korea.basic1.note.NoteService;
import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.page.NotePageService;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pages")
@RequiredArgsConstructor
public class NotePageRestController {

    private final NoteService noteService;
    private final NotePageService notePageService;
    private final NotePageDetailService notePageDetailService;

    @RequestMapping("/add/{noteId}")
    public String add(@PathVariable Long noteId) {
        Note note = noteService.getNoteById(noteId);
        NotePageDetail notePageDetail = notePageDetailService.saveDefaultPageDetail();
        NotePage notePage = notePageService.saveDefaultNotePage(note, notePageDetail);

        return "{\"msg\" : \"페이지가 생성되었습니다.\", \"notePageId\" : " + notePage.getId() + "}";
    }

    @Getter
    @Setter
    private static class PageUpdateParamDto {
        private Long noteId;
        private String title;
        private String content;
    }
    @RequestMapping("/update/{pageId}")
    public String update(@PathVariable Long pageId, @RequestBody PageUpdateParamDto pageUpdateParamDto) {
        notePageService.updateNotePage(pageId, pageUpdateParamDto.getTitle(), pageUpdateParamDto.getContent());
        return "{\"msg\" : \"페이지가 수정되었습니다.\", \"noteId\" : " + pageUpdateParamDto.getNoteId() + ", \"pageId\" : " + pageId + "}";
    }

    @Getter
    @Setter
    private static class DeleteUpdateParamDto {
        private Long noteId;
    }
    @RequestMapping("/delete/{pageId}")
    public String delete(@PathVariable Long pageId, @RequestBody DeleteUpdateParamDto deleteUpdateParamDto) {
        notePageService.delete(pageId);
        return "{\"msg\" : \"페이지가 삭제되었습니다.\", \"noteId\" : " + deleteUpdateParamDto.getNoteId() + "}";
    }

    @Getter
    @Setter
    private static class UpdateMovePageParamDto {
        private Long noteId;
    }
    @RequestMapping("/update/move/{pageId}")
    public String move(@PathVariable Long pageId, @RequestBody UpdateMovePageParamDto updateMovePageParamDto) {
        NotePage target = notePageService.getNotePageById(pageId);
        Note destination = noteService.getNoteById(updateMovePageParamDto.getNoteId());
        NotePage result = notePageService.movePage(target, destination);
        return "{\"msg\" : \"페이지를 이동하였습니다.\"}";
    }
}
