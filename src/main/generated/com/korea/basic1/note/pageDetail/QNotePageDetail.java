package com.korea.basic1.note.pageDetail;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotePageDetail is a Querydsl query type for NotePageDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNotePageDetail extends EntityPathBase<NotePageDetail> {

    private static final long serialVersionUID = 646316222L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotePageDetail notePageDetail = new QNotePageDetail("notePageDetail");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.korea.basic1.note.page.QNotePage notePage;

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public QNotePageDetail(String variable) {
        this(NotePageDetail.class, forVariable(variable), INITS);
    }

    public QNotePageDetail(Path<? extends NotePageDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotePageDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotePageDetail(PathMetadata metadata, PathInits inits) {
        this(NotePageDetail.class, metadata, inits);
    }

    public QNotePageDetail(Class<? extends NotePageDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.notePage = inits.isInitialized("notePage") ? new com.korea.basic1.note.page.QNotePage(forProperty("notePage"), inits.get("notePage")) : null;
    }

}

