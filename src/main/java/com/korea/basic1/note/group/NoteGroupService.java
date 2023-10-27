package com.korea.basic1.note.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoteGroupService {
    private final NoteGroupRepository noteGroupRepository;

}
