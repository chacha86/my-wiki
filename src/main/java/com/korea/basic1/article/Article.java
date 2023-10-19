package com.korea.basic1.article;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Article {

    // 게시물 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 제목
    @Column(length = 100, nullable = false)
    private String title;
    // 내용
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    // 조회수
    private int hit;

    private LocalDateTime createDate;
}
