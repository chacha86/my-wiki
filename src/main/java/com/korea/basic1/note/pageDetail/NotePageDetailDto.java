package com.korea.basic1.note.pageDetail;

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
public class NotePageDetailDto {

    private Long id;
    private String content;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
