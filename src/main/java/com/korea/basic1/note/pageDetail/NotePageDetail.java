package com.korea.basic1.note.pageDetail;

import com.korea.basic1.note.page.NotePage;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotePageDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    @OneToOne(mappedBy = "notePageDetail")
    private NotePage notePage;
}
