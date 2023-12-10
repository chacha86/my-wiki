package com.korea.basic1.note;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NoteUIParam {
    private List<Long> openList;
    private double noteWidth;
    private double pageWidth;
    private int noteSideScrollPosition;
    private int pageSideScrollPosition;
    private boolean sideMenuHidden;

    public NoteUIParam() {
        this.openList = new ArrayList<>();
        this.noteWidth = 300;
        this.pageWidth = 300;
        this.sideMenuHidden = false;
    }
}
