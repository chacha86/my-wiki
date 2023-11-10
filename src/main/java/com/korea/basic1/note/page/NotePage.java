package com.korea.basic1.note.page;

import com.korea.basic1.note.Note;
import com.korea.basic1.note.pageDetail.NotePageDetail;
import com.korea.basic1.note.tag.Tag;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class NotePage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;
    private int hit;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    @ManyToOne
    private Note note;

    @OneToOne
    private NotePageDetail notePageDetail;

    @OneToMany(mappedBy = "notePage")
    private List<Tag> tagList = new ArrayList<>();
}
