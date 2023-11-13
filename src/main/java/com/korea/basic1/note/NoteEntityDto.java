package com.korea.basic1.note;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteEntityDto {
    private Long id;
    private String name;
    private Long parentId;
    private String parentName;
    private Integer depth;
}
