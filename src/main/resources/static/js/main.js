import './event_handler/event_nav_toggle.js';
import './event_handler/event_side_drag.js';
import './event_handler/event_search_box.js';
import './event_handler/event_item_menu.js';
import './event_handler/event_btn.js';
import {Note, NoteApi, NoteRenderer, getNoteUIParamJsonStr} from './ui/note_renderer.js';
import {NotePage} from './ui/note_page_renderer.js';
import {} from './ui/search_result_renderer.js';

import {renderingMoveModalNoteTree} from './ui/move_modal_renderer.js';
// import { getNotesCallback } from './callback.js';
// import {addContextMenuEventToNote} from "./ui/item_menu_renderer.js";
// renderingNoteTree2(getNoteUIParamJsonStr(), null, null);


let noteApi = new NoteApi();
let note = new Note(noteApi);
let noteRenderer = new NoteRenderer(note);

// Note Main
noteRenderer.renderSideNoteTree();




let notePage = new NotePage();

try {
    note.renderingNoteTree(getNoteUIParamJsonStr());
} catch (e) {
    console.log(e);
}


// note.renderingNoteTree2(getNoteUIParamJsonStr());

// getNotes(getNoteUIParamJsonStr(), renderingNoteTree, getNotesCallback);


// addContextMenuEventToNote(getNotesCallback);

// noteApi.getNotes(getNoteUIParamJsonStr());
// document.querySelectorAll('#note-item-list li').forEach(item => {
//     console.log('========================>');
//     console.log(item);
//     item.addEventListener('click', event => {
//         const noteIdNo = item.getAttribute("data-note-id-no");
//         getPages(82);
//     })
// });
