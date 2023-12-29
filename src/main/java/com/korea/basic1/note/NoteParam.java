package com.korea.basic1.note;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class NoteParam {

    @Getter
    private enum SortTarget {
        UPDATE_DATE("updateDate"),
        CREATE_DATE("createDate"),
        TITLE("title");

        private final String value;

        SortTarget(String value) {
            this.value = value;
        }
    }

    private Note note;
    private String keyword;
    private String sort;
    private Sort.Direction sortDirection;

    public NoteParam() {
        this.keyword = "";
        this.sort = SortTarget.UPDATE_DATE.getValue();
        this.sortDirection = Sort.Direction.DESC;
    }

    public void setSort(String sort) {
        this.sort = sort;
        if (sort.equals(SortTarget.TITLE.getValue())) {
            this.sortDirection = Sort.Direction.ASC;
        }
    }
}