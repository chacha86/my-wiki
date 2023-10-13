package com.korea.basic1;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Article {

    // 게시물 번호
    @Id
    private int id;
    // 제목
    private String title;
    // 내용
    private String content;

    // 조회수
    private int hit;

    private String regDate;

    public Article(int id, String title, String content, String regDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.regDate = regDate;
    }
}
