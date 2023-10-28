package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 30, nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDateTime createDate;
    @Column(nullable = false)
    private LocalDateTime updateDate;

    @ManyToOne
    private Note parent;

    @OneToMany(mappedBy = "parent")
    private List<Note> children = new ArrayList<>();

    @OneToMany(mappedBy = "note")
    private List<NotePage> pageList = new ArrayList<>();

    @Column(nullable = false, columnDefinition = "tinyint unsigned default 0")
    private int groupYn;

}
