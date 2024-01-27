package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NoteTemplateDto {
    private Note currentNote;
    private List<Note> parentList;
    private List<Note> children = new ArrayList<>();
    private List<NotePage> pageList = new ArrayList<>();
    private List<Note> notCheckableList = new ArrayList<>();
    private Integer depth;
}
