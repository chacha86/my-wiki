package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class NoteDto {
    private Long id;
    private String name;
    private Integer groupYn;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}