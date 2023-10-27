package com.korea.basic1.note.group;

import com.korea.basic1.note.Note;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NoteGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=30, nullable = false)
    private String name;
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "noteGroup")
    private List<Note> note = new ArrayList<>();

}
