package com.korea.basic1.note;

import lombok.Getter;
import lombok.Setter;

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

    public NoteUIParam() {}

    public NoteUIParam(List<Long> openList, double noteWidth, double pageWidth, int noteSideScrollPosition, int pageSideScrollPosition, boolean sideMenuHidden) {
        this.openList = openList;
        this.noteWidth = noteWidth;
        this.pageWidth = pageWidth;
        this.noteSideScrollPosition = noteSideScrollPosition;
        this.pageSideScrollPosition = pageSideScrollPosition;
        this.sideMenuHidden = sideMenuHidden;
    }
//    public NoteUIParam() {
//        this.openList = new ArrayList<>();
//        this.noteWidth = 300;
//        this.pageWidth = 300;
//        this.sideMenuHidden = false;
//    }
}
