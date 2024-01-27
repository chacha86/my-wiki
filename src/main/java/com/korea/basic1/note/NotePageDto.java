package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.pageDetail.NotePageDetailDto;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class NotePageDto {
    private Long noteId;
    private Long id;
    private String title;
    private int hit;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private NotePageDetailDto notePageDetailDto;

}
