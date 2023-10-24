package com.korea.basic1.note;

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
    @Column(columnDefinition = "tinyint default -1")
    private int depth;

    @OneToMany(mappedBy = "note")
    List<NotePage> pageList = new ArrayList<>();
}
