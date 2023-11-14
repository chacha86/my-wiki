package com.korea.basic1.note;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class NoteTreeDto {
    private Long id;
    private String name;
    private boolean open;
    private List<NoteTreeDto> children;
}