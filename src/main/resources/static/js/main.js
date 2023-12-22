import './event_handler/event_nav_toggle.js';
import './event_handler/event_side_drag.js';
import './event_handler/event_search_box.js';
import {getNotes} from './note_api.js';
import { renderingNoteTree, getNoteUIParamJsonStr} from './ui/note_renderer.js';
import { getNotesCallback } from './callback.js';
// import {addContextMenuEventToNote} from "./ui/item_menu_renderer.js";


getNotes(getNoteUIParamJsonStr(), renderingNoteTree, getNotesCallback);


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
