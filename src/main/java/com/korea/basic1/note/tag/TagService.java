package com.korea.basic1.note.tag;

import com.korea.basic1.note.page.NotePage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Tag create(String tagName, NotePage page) {
        Tag tag = new Tag();
        tag.setName(tagName);
        tag.setNotePage(page);
        return tagRepository.save(tag);
    }

    public List<Tag> getTagListByNotePage(NotePage page) {
        return tagRepository.findByNotePage(page);
    }
}
