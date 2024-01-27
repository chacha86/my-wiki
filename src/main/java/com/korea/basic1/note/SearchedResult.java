package com.korea.basic1.note;

import com.korea.basic1.note.page.NotePage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SearchedResult {
    private String keyword;
    private List<NoteDto>  searchedNoteList;
    private List<NotePageDto> searchedNotePageList;

}