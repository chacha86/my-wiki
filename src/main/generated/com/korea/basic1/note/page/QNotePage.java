package com.korea.basic1.note.page;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotePage is a Querydsl query type for NotePage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNotePage extends EntityPathBase<NotePage> {

    private static final long serialVersionUID = -706081122L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotePage notePage = new QNotePage("notePage");

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.korea.basic1.note.QNote note;

    public final com.korea.basic1.note.pageDetail.QNotePageDetail notePageDetail;

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public QNotePage(String variable) {
        this(NotePage.class, forVariable(variable), INITS);
    }

    public QNotePage(Path<? extends NotePage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotePage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotePage(PathMetadata metadata, PathInits inits) {
        this(NotePage.class, metadata, inits);
    }

    public QNotePage(Class<? extends NotePage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.note = inits.isInitialized("note") ? new com.korea.basic1.note.QNote(forProperty("note"), inits.get("note")) : null;
        this.notePageDetail = inits.isInitialized("notePageDetail") ? new com.korea.basic1.note.pageDetail.QNotePageDetail(forProperty("notePageDetail"), inits.get("notePageDetail")) : null;
    }

}

