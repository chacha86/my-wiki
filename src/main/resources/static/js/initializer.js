import {CommonRenderer} from "./common/common_renderer.js";
import {CommonHandler} from "./common/common_handler.js";
import {NoteRenderer} from "./note/note_renderer.js";
import {NoteHandler} from "./note/note_handler.js";
import {NotePageRenderer} from "./note/note_page/note_page_renderer.js";
import {NotePageHandler} from "./note/note_page/note_page_handler.js";
import {NotePageContentRenderer} from "./note/note_page_content/note_page_content_renderer.js";
import {NotePageContentHandler} from "./note/note_page_content/note_page_content_handler.js";
import {NoteMenuRenderer} from "./note/menu/note_menu_renderer.js";
import {NoteMenuHandler} from "./note/menu/note_menu_handler.js";
import {NoteMoveModalRenderer} from "./note/menu/move/note_move_modal_renderer.js";
import {NoteMoveModalHandler} from "./note/menu/move/note_move_modal_handler.js";
import {PageMoveModalRenderer} from "./note/menu/move/page_move_modal_renderer.js";
import {PageMoveModalHandler} from "./note/menu/move/page_move_modal_handler.js";
import {RenameModalRenderer} from "./note/menu/rename/rename_modal_renderer.js";
import {RenameModalHandler} from "./note/menu/rename/rename_modal_handler.js";
import {SearchBoxRenderer} from "./search/search_box_renderer.js";
import {SearchBoxHandler} from "./search/search_box_handler.js";


class Initializer {
    static init() {

        HandlerFactory.set('note', new NoteHandler());
        HandlerFactory.set('notePage', new NotePageHandler());
        HandlerFactory.set('notePageContent', new NotePageContentHandler());
        HandlerFactory.set('noteMenu', new NoteMenuHandler());
        HandlerFactory.set('noteMoveModal', new NoteMoveModalHandler());
        HandlerFactory.set('pageMoveModal', new PageMoveModalHandler());
        HandlerFactory.set('renameModal', new RenameModalHandler());
        HandlerFactory.set('searchBox', new SearchBoxHandler());
        HandlerFactory.set('common', new CommonHandler());

        RendererFactory.set('note', new NoteRenderer());
        RendererFactory.set('notePage', new NotePageRenderer());
        RendererFactory.set('notePageContent', new NotePageContentRenderer());
        RendererFactory.set('noteMenu', new NoteMenuRenderer());
        RendererFactory.set('noteMoveModal', new NoteMoveModalRenderer());
        RendererFactory.set('pageMoveModal', new PageMoveModalRenderer());
        RendererFactory.set('renameModal', new RenameModalRenderer());
        RendererFactory.set('searchBox', new SearchBoxRenderer());
        RendererFactory.set('common', new CommonRenderer());
    }
}

class RendererFactory {

    static store = new Map();

    static set(key, value) {
        RendererFactory.store.set(key, value);
    }

    static get(key) {
        return RendererFactory.store.get(key);
    }

}
class HandlerFactory {

    static store = new Map();

    static set(key, value) {
        HandlerFactory.store.set(key, value);
    }

    static get(key) {
        return HandlerFactory.store.get(key);
    }

}
export {Initializer, RendererFactory, HandlerFactory};