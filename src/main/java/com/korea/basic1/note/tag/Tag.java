package com.korea.basic1.note.tag;

import com.korea.basic1.note.page.NotePage;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    @ManyToOne
    private NotePage notePage;
}
